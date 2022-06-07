import type { BaseBuilder, BaseConfig } from './types';
declare function createBaseBuilder<P, MP, K extends string>(config: BaseConfig<P, MP>): BaseBuilder<P, MP, K> & {
    props: any;
    map: any;
};
export { createBaseBuilder };
