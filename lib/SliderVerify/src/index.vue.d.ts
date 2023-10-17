declare const _default: import("vue").DefineComponent<{
    img: {
        type: import("vue").PropType<string>;
    };
    verifyPass: {
        type: import("vue").PropType<boolean>;
    };
    width: {
        type: import("vue").PropType<number>;
    };
    height: {
        type: import("vue").PropType<number>;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    onSuccess: (...args: any[]) => void;
    onError: (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    img: {
        type: import("vue").PropType<string>;
    };
    verifyPass: {
        type: import("vue").PropType<boolean>;
    };
    width: {
        type: import("vue").PropType<number>;
    };
    height: {
        type: import("vue").PropType<number>;
    };
}>> & {
    onOnSuccess?: ((...args: any[]) => any) | undefined;
    onOnError?: ((...args: any[]) => any) | undefined;
}, {}, {}>;
export default _default;
