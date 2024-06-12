<script lang="ts">
    import { yaml } from '@codemirror/lang-yaml';
    import { RulePage, getDocumentationSiteMap } from '@publicodes/react-ui';
    import { createElement } from 'react';
    import { createRoot, type Root } from 'react-dom/client';
    import { onMount } from 'svelte';
    import { espresso } from 'thememirror';
    import { parse } from 'yaml';

    import Engine from 'publicodes';
    import CodeMirror from 'svelte-codemirror-editor';
    import { objectFlip } from './utils';

    const { code, title = 'Publicodes' }: { code: string; title: string } = $props();
    let value = $state(code);
    let docElement: HTMLDivElement;

    try {
        let engine = $derived(new Engine(parse(value)));
        const pathToRules = $derived(getDocumentationSiteMap({ engine, documentationPath: '' }));
        const ruleToPaths = $derived(objectFlip(pathToRules));
        const rulePath = Object.keys(ruleToPaths)[0];
        const documentationProps = $derived({
            engine,
            searchBar: false,
            documentationPath: '',
            showDevSection: false,
            rulePath
            // other props left as an exercice to the reader
        });
        let reactRoot: Root | undefined = $state();
        $effect(() => {
            if (!reactRoot) return;
            reactRoot.render(createElement(RulePage, documentationProps));
        });
        onMount(() => {
            reactRoot = createRoot(docElement);
        });
    } catch (e) {
        console.error(e);
    }
</script>

<div class="editor not-prose overflow-hidden border border-slate-300 max-sm:-mx-6 sm:rounded-lg">
    <div
        class="text-bold w-full border-b border-slate-300 bg-sky-50 p-3 text-center font-bold text-sky-600"
    >
        {title}
    </div>
    <div class="editor 2xl:flex">
        <CodeMirror
            bind:value
            lang={yaml()}
            theme={espresso}
            editable={true}
            styles={{
                '&': {
                    fontSize: '1rem'
                }
            }}
        />

        <div
            class="publicodes-documentation prose-lg border-slate-300 max-2xl:border-t max-lg:px-4 lg:max-2xl:pr-4 2xl:border-l"
            bind:this={docElement}
        ></div>
    </div>
</div>

<style>
    .editor {
        & :global(.cm-editor) {
            @apply h-full;
        }
        & :global(.cm-content) {
            @apply h-full py-4;
        }
        & :global(.cm-gutters) {
            @apply bg-sky-50;
        }
    }
    .publicodes-documentation {
        & :global(h1) {
            @apply mb-6 mt-3 text-xl font-bold;
            /* @apply hidden; */
        }
        & :global(#documentation-rule-root) {
            @apply 2xl:flex-row-reverse;
            & :global(article) {
                @apply border-slate-300 2xl:border-r 2xl:pr-4;
            }
            & :global(nav) {
                @apply 2xl:border-none;
            }
        }
        & :global(h2) {
            @apply mb-4 mt-6 text-lg font-bold;
        }
        & :global(p) {
            @apply my-3;
        }
        & :global(li) {
            @apply my-0;
        }
        & :global(button) {
            @apply cursor-pointer rounded border bg-slate-50 px-2 py-1 text-sm hover:bg-slate-100;
        }
        & :global(a) {
            @apply cursor-pointer font-sans hover:underline;
        }
        & :global(:not(.content) > a) {
            @apply text-sky-600 underline hover:text-sky-700;
        }
        & :global(.content > a) {
            @apply block flex-1;
        }
        & :global(.content) {
            @apply w-full hover:bg-slate-100;
        }
        & :global(.dropdown.active .content) {
            @apply bg-slate-100 font-bold text-sky-600;
        }
    }
</style>
