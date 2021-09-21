import {
    Voicemeeter
} from "voicemeeter-connector"
import _settings from './plugin.json'

var vm: Voicemeeter

export declare enum StripProperties {
    Mono = "Mono",
        Mute = "Mute",
        Solo = "Solo",
        MC = "MC",
        Gain = "Gain",
        Pan_x = "Pan_x",
        Pan_y = "Pan_y",
        Color_x = "Color_x",
        Color_y = "Color_y",
        fx_x = "fx_x",
        fx_y = "fx_y",
        Audibility = "Audibility",
        Comp = "Comp",
        Gate = "Gate",
        EqGain1 = "EqGain1",
        EqGain2 = "EqGain2",
        EqGain3 = "EqGain3",
        Label = "Label",
        A1 = "A1",
        A2 = "A2",
        A3 = "A3",
        A4 = "A4",
        A5 = "A5",
        B1 = "B1",
        B2 = "B2",
        B3 = "B3",
        FadeTo = "FadeTo"
}
export declare enum BusProperties {
    Mono = "Mono",
        Mute = "Mute",
        EQ = "EQ.on",
        Gain = "Gain",
        NormalMode = "mode.normal",
        AmixMode = "mode.Amix",
        BmixMode = "mode.Bmix",
        RepeatMode = "mode.Repeat",
        CompositeMode = "mode.Composite",
        FadeTo = "FadeTo"
}

export var settings = _settings
export async function init(): Promise < boolean > {
    try {
        vm = await (await Voicemeeter.init());
        vm.connect();
        return true
    } catch {
        return false
    }
}

export async function setStripGain(index: number, gain: number): Promise < boolean > {
    try {
        vm.setStripParameter(index - 1, StripProperties.Gain, gain);
        return true
    } catch {
        return false
    }
}
export async function setBusGain(index: number, gain: number): Promise < boolean > {
    try {
        vm.setBusParameter(index - 1, BusProperties.Gain, gain);
        return true
    } catch {
        return false
    }
}

export async function setStripProperty(index: number, property: StripProperties, value: any): Promise < boolean > {
    try {
        vm.setStripParameter(index - 1, property, value);
        return true
    } catch {
        return false
    }
}
export async function setBusProperty(index: number, property: BusProperties, value: any): Promise < boolean > {
    try {
        vm.setBusParameter(index - 1, property, value);
        return true
    } catch {
        return false
    }
}