import * as Blockly from 'blockly';
import {LexicalVariable, FieldLexicalVariable} from '@mit-app-inventor/blockly-block-lexical-variables/src/fields/field_lexical_variable';
import {FieldParameterFlydown} from '@mit-app-inventor/blockly-block-lexical-variables/src/fields/field_parameter_flydown';
import {
  FieldFlydown
} from '@mit-app-inventor/blockly-block-lexical-variables/src/fields/field_flydown';

Blockly.Blocks['events_error'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('when')
        .appendField('ErrorOccurred')
        .appendField(
            new FieldParameterFlydown('message', true, FieldFlydown.DISPLAY_BELOW),
            'ERR_STR_VAR');
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  withLexicalVarsAndPrefix: function(child, proc) {
    const params = this.declaredNames();
    // not arguments_ instance var
    for (let i = 0; i < params.length; i++) {
      proc(params[i], '');
    }
  },
  getVars: function() {
    return [
      this.getFieldValue('ERR_STR_VAR'),
    ];
  },
  blocksInScope: function() {
    const doBlock = this.getInputTargetBlock('DO');
    if (doBlock) {
      return [doBlock];
    } else {
      return [];
    }
  },
  declaredNames: function() {
    return [
      this.getFieldValue('ERR_STR_VAR'),
    ];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('ERR_STR_VAR'))) {
      this.setFieldValue(newName, 'ERR_STR_VAR');
    }
  },
  renameBound: function(boundSubstitution, freeSubstitution) {
    const paramSubstitution = boundSubstitution.restrictDomain(
        this.declaredNames());
    this.renameVars(paramSubstitution);
    const newFreeSubstitution = freeSubstitution.extend(paramSubstitution);
    LexicalVariable.renameFree(
        this.getInputTargetBlock(this.bodyInputName), newFreeSubstitution);
  },
  renameFree: function(freeSubstitution) {
    // There shouldn't be any free variables
  },
  freeVariables: function() { // return the free variables of this block
    // There shouldn't be any free variables, so this should return an empty set.
    // Should return the empty set: something is wrong if it doesn't!
    return new Blockly.NameSet();
  }
};

Blockly.Blocks['events_keypress'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('when')
        .appendField('AnyKeyboardKeyPressed')
        .appendField(
            new FieldParameterFlydown('key_code', true, FieldFlydown.DISPLAY_BELOW),
            'KEYCODE_VAR')
        .appendField(
            new FieldParameterFlydown('key_name', true, FieldFlydown.DISPLAY_BELOW),
            'KEYNAME_VAR');
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("do");
    this.setColour(20);
    this.setTooltip("");
    this.setHelpUrl("");
  },
  withLexicalVarsAndPrefix: function(child, proc) {
    const params = this.declaredNames();
    // not arguments_ instance var
    for (let i = 0; i < params.length; i++) {
      proc(params[i], '');
    }
  },
  getVars: function() {
    return [
        this.getFieldValue('KEYCODE_VAR'),
        this.getFieldValue('KEYNAME_VAR')
    ];
  },
  blocksInScope: function() {
    const doBlock = this.getInputTargetBlock('DO');
    if (doBlock) {
      return [doBlock];
    } else {
      return [];
    }
  },
  declaredNames: function() {
    return [
      this.getFieldValue('KEYCODE_VAR'),
      this.getFieldValue('KEYNAME_VAR')
    ];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('KEYCODE_VAR'))) {
      this.setFieldValue(newName, 'KEYCODE_VAR');
    }
    if (Blockly.Names.equals(oldName, this.getFieldValue('KEYNAME_VAR'))) {
      this.setFieldValue(newName, 'KEYNAME_VAR');
    }
  },
  renameBound: function(boundSubstitution, freeSubstitution) {
    const paramSubstitution = boundSubstitution.restrictDomain(
        this.declaredNames());
    this.renameVars(paramSubstitution);
    const newFreeSubstitution = freeSubstitution.extend(paramSubstitution);
    LexicalVariable.renameFree(
        this.getInputTargetBlock(this.bodyInputName), newFreeSubstitution);
  },
  renameFree: function(freeSubstitution) {
    // There shouldn't be any free variables
  },
  freeVariables: function() { // return the free variables of this block
    // There shouldn't be any free variables, so this should return an empty set.
    // Should return the empty set: something is wrong if it doesn't!
    return new Blockly.NameSet();
  }
};
