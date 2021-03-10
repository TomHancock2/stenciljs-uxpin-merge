/// <reference types="react" />
import { Components } from 'components';
interface ExampleInputProps extends Omit<Components.ExampleInput, "getNativeElement" | "validate" | "reset"> {
    uxpId?: string;
    uxpinRef?: string;
    children?: any;
}
/**
 * @uxpinwrappers
 * SkipContainerWrapper
*/
declare const ExampleInput: (props: ExampleInputProps) => JSX.Element;
export { ExampleInput as default };
