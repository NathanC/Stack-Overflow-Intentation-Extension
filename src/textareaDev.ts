/**
 * This is sourced from a codepen (https://codepen.io/MeBeiM/pen/ogrmBP/) by Marco Bonelli (http://stackoverflow.com/users/3889449)
 * 
 * I discovered it in this meta stack overflow post: https://meta.stackoverflow.com/questions/290026/markdown-editor-indent-and-outdent-functionality
 * 
 * In that post, Marco states:
 * > It's just sixty lines of code so I don't see the need of any copyright/license/attribution, 
 * > I just wanted to share it with my fellow programmers here on Stack Overflow :)
 * 
 * In that spirit, this file is offically unlicensed, though I have made some modifications. 
 * However, if you use it, please attribute Marco, and optionally me if you use the modifications.
 * 
 * Thanks Marco!
 */

import { IntRange } from "./TypeHelpers";

/************  Original Notice, some aspects outdated *************************************************************************
 * Title: Textarea developer TAB key (beta)
 * Author: Marco Bonelli (http://stackoverflow.com/users/3889449)
 *
 * Description:
 *   Enables extended TAB functionality on textareas of the current page for indenting/dedenting single/multiple lines.
 *   The default indentation is 4 spaces ("    "); change the var TAB_CHAR if you want to use another TAB delimiter.
 *   Originally developed for Stack Overflow Markdown editor.
 *
 * Implementation:
 *   Use 'element.enableTextareaDev()' to enable the feature for all the textareas inside the element (including the element itself).
 *   Use 'element.disableTextareaDev()' to disable the previously enabled feature.
 *
 * Usage:
 *   Single line: place the cursor where you want and press [TAB] to add a tab character, or [SHIFT]+[TAB] to remove a previously inserted tab character (before the caret position).
 *   Multi line: select multiple lines of code and press [TAB] to add a tab character at the beginning of each line, or [SHIFT]+[TAB] to remove previously inserted tab characters.
 *
 ********************************************************************************************************************************/

export default function textareaDev(tabLength: IntRange<1, 12>) {
    
    // todo: consider checking for e.target.tagName == 'TEXTAREA' (which used to be there), or add stronger typing to e
    return function inner(this: HTMLTextAreaElement, e: KeyboardEvent) {

        let TAB_CHAR = ' '.repeat(tabLength),
            selectionDelta = 0, // not sure about the name of this, was "ds" before
            selectedText: string,
            selectionStart: number,
            selectionEnd: number,
            allText: string;

        if (e.key === "Tab") {
            e.stopPropagation();
            e.preventDefault();

            selectionStart = this.selectionStart;
            selectionEnd = this.selectionEnd;
            selectedText = this.value.substring(selectionStart, selectionEnd);
            allText = this.value;

            if (~selectedText.indexOf('\n')) {
                if (e.shiftKey) {
                    selectedText = selectedText.split('\n').map(function(el) {
                        if (el.substr(0,TAB_CHAR.length) == TAB_CHAR) return el.substr(4);
                        return el;
                    }).join('\n');

                    this.value = allText.substr(0, selectionStart) + selectedText + allText.substr(selectionEnd);
                } else {
                    selectedText = selectedText.split('\n').map(function(el) { return TAB_CHAR + el }).join('\n');
                    this.value = allText.substr(0, selectionStart) + selectedText + allText.substr(selectionEnd);
                }

                this.selectionStart = selectionStart;
                this.selectionEnd = selectionStart+selectedText.length;
            } else {
                if (e.shiftKey) {
                    if (allText.substr(selectionStart-TAB_CHAR.length, TAB_CHAR.length) == TAB_CHAR) {
                        this.value = allText.substr(0, selectionStart-TAB_CHAR.length) + allText.substr(selectionEnd);
                        selectionDelta = -TAB_CHAR.length;
                    }
                } else {
                    this.value = allText.substr(0, selectionStart) + TAB_CHAR + allText.substr(selectionEnd);
                    selectionDelta = TAB_CHAR.length;
                }

                this.selectionStart = this.selectionEnd = selectionStart + selectionDelta;
            }
        }
    
    }
}
