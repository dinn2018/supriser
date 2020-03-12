import { createDecorator } from 'vue-class-component';

export const Meta = createDecorator((options, key: string) => {
    console.log(options, key, options.methods);
    options['metaInfo'] = options.methods ? options.methods[key] : {};
});