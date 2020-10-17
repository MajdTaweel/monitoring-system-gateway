import { element, by, ElementFinder } from 'protractor';

export class MagnetometerReadingsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-magnetometer-readings div table .btn-danger'));
  title = element.all(by.css('jhi-magnetometer-readings div h2#page-heading span')).first();
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

export class MagnetometerReadingsUpdatePage {
  pageTitle = element(by.id('jhi-magnetometer-readings-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  xInput = element(by.id('field_x'));
  yInput = element(by.id('field_y'));
  zInput = element(by.id('field_z'));
  rmsInput = element(by.id('field_rms'));

  sensingNodeSelect = element(by.id('field_sensingNode'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setXInput(x: string): Promise<void> {
    await this.xInput.sendKeys(x);
  }

  async getXInput(): Promise<string> {
    return await this.xInput.getAttribute('value');
  }

  async setYInput(y: string): Promise<void> {
    await this.yInput.sendKeys(y);
  }

  async getYInput(): Promise<string> {
    return await this.yInput.getAttribute('value');
  }

  async setZInput(z: string): Promise<void> {
    await this.zInput.sendKeys(z);
  }

  async getZInput(): Promise<string> {
    return await this.zInput.getAttribute('value');
  }

  async setRmsInput(rms: string): Promise<void> {
    await this.rmsInput.sendKeys(rms);
  }

  async getRmsInput(): Promise<string> {
    return await this.rmsInput.getAttribute('value');
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

export class MagnetometerReadingsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-magnetometerReadings-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-magnetometerReadings'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
