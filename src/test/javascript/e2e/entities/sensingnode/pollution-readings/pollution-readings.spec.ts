import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../../page-objects/jhi-page-objects';

import {
  PollutionReadingsComponentsPage,
  PollutionReadingsDeleteDialog,
  PollutionReadingsUpdatePage,
} from './pollution-readings.page-object';

const expect = chai.expect;

describe('PollutionReadings e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pollutionReadingsComponentsPage: PollutionReadingsComponentsPage;
  let pollutionReadingsUpdatePage: PollutionReadingsUpdatePage;
  let pollutionReadingsDeleteDialog: PollutionReadingsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load PollutionReadings', async () => {
    await navBarPage.goToEntity('pollution-readings');
    pollutionReadingsComponentsPage = new PollutionReadingsComponentsPage();
    await browser.wait(ec.visibilityOf(pollutionReadingsComponentsPage.title), 5000);
    expect(await pollutionReadingsComponentsPage.getTitle()).to.eq('gatewayApp.sensingnodePollutionReadings.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(pollutionReadingsComponentsPage.entities), ec.visibilityOf(pollutionReadingsComponentsPage.noResult)),
      1000
    );
  });

  it('should load create PollutionReadings page', async () => {
    await pollutionReadingsComponentsPage.clickOnCreateButton();
    pollutionReadingsUpdatePage = new PollutionReadingsUpdatePage();
    expect(await pollutionReadingsUpdatePage.getPageTitle()).to.eq('gatewayApp.sensingnodePollutionReadings.home.createOrEditLabel');
    await pollutionReadingsUpdatePage.cancel();
  });

  it('should create and save PollutionReadings', async () => {
    const nbButtonsBeforeCreate = await pollutionReadingsComponentsPage.countDeleteButtons();

    await pollutionReadingsComponentsPage.clickOnCreateButton();

    await promise.all([
      pollutionReadingsUpdatePage.setAirInput('5'),
      pollutionReadingsUpdatePage.setSoundInput('5'),
      pollutionReadingsUpdatePage.sensingNodeSelectLastOption(),
    ]);

    expect(await pollutionReadingsUpdatePage.getAirInput()).to.eq('5', 'Expected air value to be equals to 5');
    expect(await pollutionReadingsUpdatePage.getSoundInput()).to.eq('5', 'Expected sound value to be equals to 5');

    await pollutionReadingsUpdatePage.save();
    expect(await pollutionReadingsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await pollutionReadingsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last PollutionReadings', async () => {
    const nbButtonsBeforeDelete = await pollutionReadingsComponentsPage.countDeleteButtons();
    await pollutionReadingsComponentsPage.clickOnLastDeleteButton();

    pollutionReadingsDeleteDialog = new PollutionReadingsDeleteDialog();
    expect(await pollutionReadingsDeleteDialog.getDialogTitle()).to.eq('gatewayApp.sensingnodePollutionReadings.delete.question');
    await pollutionReadingsDeleteDialog.clickOnConfirmButton();

    expect(await pollutionReadingsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
