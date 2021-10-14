export function getPathsFor(data: any[] | null, propName="id") {
    if (!data || data?.length === 0) return [];
    const paths = data?.map((item) => ({
      params: { [propName]: item[propName]?.toString() },
    }));

    return paths;
}
