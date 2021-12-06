import * as Blockly from 'blockly';
import {LexicalVariable, FieldLexicalVariable} from '@mit-app-inventor/blockly-block-lexical-variables/src/fields/field_lexical_variable';
import {FieldParameterFlydown} from '@mit-app-inventor/blockly-block-lexical-variables/src/fields/field_parameter_flydown';
import {
  FieldFlydown
} from '@mit-app-inventor/blockly-block-lexical-variables/src/fields/field_flydown';

Blockly.Blocks['events'] = {
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
  referenceResults: function(name, prefix, env) {
    let errStrVar = this.getFieldValue('ERR_STR_VAR');
    const newEnv = env.concat([errStrVar]);
    const doResults = LexicalVariable.referenceResult(
        this.getInputTargetBlock('DO'), name, prefix, newEnv);
    const nextResults = LexicalVariable.referenceResult(
        LexicalVariable.getNextTargetBlock(this), name, prefix, env);
    return [doResults, nextResults];
  },
  withLexicalVarsAndPrefix: function(child, proc) {
    if (this.getInputTargetBlock('DO') == child) {
      const lexVar = this.getFieldValue('ERR_STR_VAR');
      proc(lexVar, '');
    }
  },
  getVars: function() {
    return [this.getFieldValue('ERR_STR_VAR')];
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
    return [this.getFieldValue('ERR_STR_VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
      this.setFieldValue(newName, 'ERR_STR_VAR');
    }
  },
  renameBound: function(boundSubstitution, freeSubstitution) {
    const oldIndexVar = this.getFieldValue('VAR');
    const newIndexVar = boundSubstitution.apply(oldIndexVar);
    if (newIndexVar !== oldIndexVar) {
      this.renameVar(oldIndexVar, newIndexVar);
      const indexSubstitution = Blockly.Substitution.simpleSubstitution(
          oldIndexVar, newIndexVar);
      const extendedFreeSubstitution = freeSubstitution.extend(
          indexSubstitution);
      LexicalVariable.renameFree(this.getInputTargetBlock('DO'),
          extendedFreeSubstitution);
    } else {
      const removedFreeSubstitution = freeSubstitution.remove([oldIndexVar]);
      LexicalVariable.renameFree(this.getInputTargetBlock('DO'),
          removedFreeSubstitution);
    }
    if (this.nextConnection) {
      const nextBlock = this.nextConnection.targetBlock();
      LexicalVariable.renameFree(nextBlock, freeSubstitution);
    }
  },
  renameFree: function(freeSubstitution) {
    const indexVar = this.getFieldValue('ERR_STR_VAR');
    const bodyFreeVars = LexicalVariable.freeVariables(
        this.getInputTargetBlock('DO'));
    bodyFreeVars.deleteName(indexVar);
    const renamedBodyFreeVars = bodyFreeVars.renamed(freeSubstitution);
    if (renamedBodyFreeVars.isMember(indexVar)) { // Variable capture!
      const newIndexVar = FieldLexicalVariable.nameNotIn(indexVar,
          renamedBodyFreeVars.toList());
      const boundSubstitution = Blockly.Substitution.simpleSubstitution(
          indexVar, newIndexVar);
      this.renameBound(boundSubstitution, freeSubstitution);
    } else {
      this.renameBound(new Blockly.Substitution(), freeSubstitution);
    }
  },
  freeVariables: function() { // return the free variables of this block
    const result = LexicalVariable.freeVariables(
        this.getInputTargetBlock('DO'));
    // Remove bound index variable from body free vars
    result.deleteName(this.getFieldValue('ERR_STR_VAR'));
    if (this.nextConnection) {
      const nextBlock = this.nextConnection.targetBlock();
      result.unite(LexicalVariable.freeVariables(nextBlock));
    }
    return result;
  },
};
