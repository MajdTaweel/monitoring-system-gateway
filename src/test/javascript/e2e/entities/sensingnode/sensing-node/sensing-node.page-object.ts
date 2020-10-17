import { element, by, ElementFinder } from 'protractor';

export class SensingNodeComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sensing-node div table .btn-danger'));
  title = element.all(by.css('jhi-sensing-node div h2#page-heading span')).first();
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

export class SensingNodeUpdatePage {
  pageTitle = element(by.id('jhi-sensing-node-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  sensingNodeTypeSelect = element(by.id('field_sensingNodeType'));
  statusSelect = element(by.id('field_status'));
  longitudeInput = element(by.id('field_longitude'));
  latitudeInput = element(by.id('field_latitude'));
  batteryInput = element(by.id('field_battery'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSensingNodeTypeSelect(sensingNodeType: string): Promise<void> {
    await this.sensingNodeTypeSelect.sendKeys(sensingNodeType);
  }

  async getSensingNodeTypeSelect(): Promise<string> {
    return await this.sensingNodeTypeSelect.element(by.css('option:checked')).getText();
  }

  async sensingNodeTypeSelectLastOption(): Promise<void> {
    await this.sensingNodeTypeSelect.all(by.tagName('option')).last().click();
  }

  async setStatusSelect(status: string): Promise<void> {
    await this.statusSelect.sendKeys(status);
  }

  async getStatusSelect(): Promise<string> {
    return await this.statusSelect.element(by.css('option:checked')).getText();
  }

  async statusSelectLastOption(): Promise<void> {
    await this.statusSelect.all(by.tagName('option')).last().click();
  }

  async setLongitudeInput(longitude: string): Promise<void> {
    await this.longitudeInput.sendKeys(longitude);
  }

  async getLongitudeInput(): Promise<string> {
    return await this.longitudeInput.getAttribute('value');
  }

  async setLatitudeInput(latitude: string): Promise<void> {
    await this.latitudeInput.sendKeys(latitude);
  }

  async getLatitudeInput(): Promise<string> {
    return await this.latitudeInput.getAttribute('value');
  }

  async setBatteryInput(battery: string): Promise<void> {
    await this.batteryInput.sendKeys(battery);
  }

  async getBatteryInput(): Promise<string> {
    return await this.batteryInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class SensingNodeDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sensingNode-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sensingNode'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
