export function addToMapSet<T>(map: Map<T, Set<T>>, key: T, value: T) {
	if (map.has(key)) {
		map.get(key)!.add(value)
		return
	}
	map.set(key, new Set([value]))
}

export function mergeWithArray<
	N extends string | number | symbol,
	M extends string | number | symbol,
	T
>(obj1: Record<N, Array<T>>, obj2: Record<M, Array<T>>): Record<N | M, Array<T>>

export function mergeWithArray<
	N extends string | number | symbol,
	M extends string | number | symbol,
	T
>(
	obj1: Partial<Record<N, Array<T>>>,
	obj2: Partial<Record<M, Array<T>>>
): Partial<Record<N | M, Array<T>>>

export function mergeWithArray<K extends string | number | symbol, T>(
	obj1: Partial<Record<K, Array<T>>>,
	obj2: Partial<Record<K, Array<T>>>
): Partial<Record<K, Array<T>>> {
	return (Object.entries(obj2) as Array<[K, Array<T>]>).reduce(
		(obj, [key, value]) => ({
			...obj,
			[key]: [...(obj[key] ?? []), ...value],
		}),
		obj1
	) as Partial<Record<K, Array<T>>>
}

export function execWhenIdle<Fn extends (...args: any[]) => any>(
	cb: Fn,
	...args: Parameters<Fn>
): Promise<ReturnType<Fn>> {
	return new Promise((resolve) => {
		if (typeof requestIdleCallback !== 'undefined') {
			requestIdleCallback(() => resolve(cb(...args)))
		} else if (typeof setImmediate !== 'undefined') {
			setImmediate(() => resolve(cb(...args)))
		} else {
			setTimeout(() => resolve(cb(...args)), 0)
		}
	})
}
