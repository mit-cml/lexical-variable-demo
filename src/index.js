/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Example of including Blockly with using Webpack with
 *               defaults: (English lang & JavaScript generator).
 * @author samelh@google.com (Sam El-Husseini)
 */

import * as Blockly from 'blockly/core';
import * as libraryBlocks from 'blockly/blocks';
import * as En from 'blockly/msg/en';
import {javascriptGenerator} from 'blockly/javascript';
import {LexicalVariablesPlugin} from '@mit-app-inventor/blockly-block-lexical-variables';

Blockly.setLocale(En);

document.addEventListener("DOMContentLoaded", function () {
    const workspace = Blockly.inject('blocklyDiv',
        {
            toolbox: document.getElementById('toolbox'),
        });

    // Load lexical variable plugin
    LexicalVariablesPlugin.init(workspace);

    const button = document.getElementById('blocklyButton');
    button.addEventListener('click', function () {
        alert("Check the console for the generated output.");
        const code = javascriptGenerator.workspaceToCode(workspace);
        console.log(code);
    })
});
