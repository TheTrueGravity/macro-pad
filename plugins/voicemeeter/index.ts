import { Voicemeeter } from "voicemeeter-connector"

var vm: Voicemeeter

export default async function init(): Promise<boolean> {
    try { vm = await Voicemeeter.init(); return false }
    catch { return false }
}

export async function setStripLevel(index: number, level: number): Promise<boolean> {
    return true
}