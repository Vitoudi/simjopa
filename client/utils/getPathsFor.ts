export function getPathsFor(data: any[] | null, propName="id") {
    const paths = data?.map((item) => ({
      params: { [propName]: item[propName]?.toString() },
    }));

    return paths;
}
