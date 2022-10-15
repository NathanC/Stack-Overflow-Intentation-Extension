import { IntRange } from "./TypeHelpers";

export default interface StorageModal {
    textAreaBorderEnabled?: boolean
    numberOfSpacesPerTab?: IntRange<1,12>
    functionalityDisabled?: boolean,
}