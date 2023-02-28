export type ImportComponentsParams = APIbuilderData[]

export interface APIbuilderData {
  collection: 'string',
  item: 'string'
}

export let importComponents = async function getComponents(components: ImportComponentsParams) {
  return await components.map(async (component: APIbuilderData) => {
    let toRender = await import(
      `../components/builder/${component.collection}.astro`
    );

    return toRender.default;
  });
};
