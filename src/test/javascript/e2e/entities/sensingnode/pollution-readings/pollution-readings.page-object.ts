import { element, by, ElementFinder } from 'protractor';

export class PollutionReadingsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-pollution-readings div table .btn-danger'));
  title = element.all(by.css('jhi-pollution-readings div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class PollutionReadingsUpdatePage {
  pageTitle = element(by.id('jhi-pollution-readings-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  airInput = element(by.id('field_air'));
  soundInput = element(by.id('field_sound'));

  sensingNodeSelect = element(by.id('field_sensingNode'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAirInput(air: string): Promise<void> {
    await this.airInput.sendKeys(air);
  }

  async getAirInput(): Promise<string> {
    return await this.airInput.getAttribute('value');
  }

  async setSoundInput(sound: string): Promise<void> {
    await this.soundInput.sendKeys(sound);
  }

  async getSoundInput(): Promise<string> {
    return await this.soundInput.getAttribute('value');
  }

  async sensingNodeSelectLastOption(): Promise<void> {
    await this.sensingNodeSelect.all(by.tagName('option')).last().click();
  }

  async sensingNodeSelectOption(option: string): Promise<void> {
    await this.sensingNodeSelect.sendKeys(option);
  }

  getSensingNodeSelect(): ElementFinder {
    return this.sensingNodeSelect;
  }

  async getSensingNodeSelectedOption(): Promise<string> {
    return await this.sensingNodeSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class PollutionReadingsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-pollutionReadings-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-pollutionReadings'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
