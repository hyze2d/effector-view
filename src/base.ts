
import type { BaseBuilder, BaseConfig } from './types';

function createBaseBuilder<P, MP, K extends string>(config: BaseConfig<P, MP>) {
  const builder: BaseBuilder<P, MP, K> & {
    props: any;
    map: any;
  } = {
    displayName(displayName) {
      config.displayName = displayName;

      return this as any;
    },

    defaultProps(defaultProps) {
      config.defaultProps = defaultProps;

      return this as any;
    },

    props(props: any) {
      config.props = props;

      return this as any;
    },

    map(map: any) {
      config.map = map;

      return this;
    },

    enter(enter) {
      config.enter = enter;

      return this as any;
    },

    exit(exit) {
      config.exit = exit;

      return this as any;
    },

    effect(effect) {
      config.effect = effect;

      return this as any;
    }
  };

  return builder;
}

export { createBaseBuilder };
