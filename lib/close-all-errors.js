'use babel';

import CloseAllErrorsView from './close-all-errors-view';
import { CompositeDisposable } from 'atom';

export default {

  closeAllErrorsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.closeAllErrorsView = new CloseAllErrorsView(state.closeAllErrorsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.closeAllErrorsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'close-all-errors:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.closeAllErrorsView.destroy();
  },

  serialize() {
    return {
      closeAllErrorsViewState: this.closeAllErrorsView.serialize()
    };
  },

  toggle() {
    console.log('CloseAllErrors was toggled!');
    var closeAll=document.querySelector("atom-notification.error .close-all.btn");
    if(closeAll.length!=0){
      closeAll.click();
    }else{
      document.querySelector("atom-notification .close").click();
    }
    return;
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  }

};
