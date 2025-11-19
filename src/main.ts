/*
  To Do:
    - Add delete account.
    - Add edit account.
    - Add empty text placeholder.
    - Add copy to clipboard.
    - [Done] Add validation.
    - Don't render empty elements.
*/

type Account = {
  label: string;
  email: string;
  username: string;
  password: string;
};
type Accounts = Account[];
type AccountListItemChild = {
  emailDiv: HTMLDivElement;
  usernameDiv: HTMLDivElement;
  passwordDiv: HTMLDivElement;
  labelHeading: HTMLHeadingElement;
  emailHeading: HTMLHeadingElement;
  usernameHeading: HTMLHeadingElement;
  passwordHeading: HTMLHeadingElement;
  emailParagraph: HTMLParagraphElement;
  usernameParagraph: HTMLParagraphElement;
  passwordParagraph: HTMLParagraphElement;
};

const accounts: Accounts = [];
const searchInput = document.querySelector(".search") as HTMLInputElement;
const form = document.querySelector(".form") as HTMLFormElement;
const labelInput = document.querySelector(".label") as HTMLInputElement;
const emailInput = document.querySelector(".email") as HTMLInputElement;
const usernameInput = document.querySelector(".username") as HTMLInputElement;
const passwordInput = document.querySelector(".password") as HTMLInputElement;
const accountsList = document.querySelector(
  ".accounts-list"
) as HTMLUListElement;

function searchAccounts(): void {
  const searchQuery = searchInput.value.toLowerCase();
  const accountListItemLabelHeadings = accountsList.getElementsByTagName("h2");

  for (const accountListItemLabelHeading of accountListItemLabelHeadings) {
    const isResultsFound = accountListItemLabelHeading.textContent
      .toLowerCase()
      .includes(searchQuery);

    if (accountListItemLabelHeading.parentElement) {
      accountListItemLabelHeading.parentElement.style.display = isResultsFound
        ? ""
        : "none";
    }
  }
}

function addAccount(accounts: Accounts): Accounts {
  const account: Account = {
    label: labelInput.value,
    email: emailInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
  };

  accounts.push(account);
  return accounts;
}

function createListItem(className: string): HTMLLIElement {
  const listItem = document.createElement("li");
  listItem.classList.add(className);
  return listItem;
}

function createAccountListItemChild(account: Account): AccountListItemChild {
  const emailDiv = document.createElement("div");
  const usernameDiv = document.createElement("div");
  const passwordDiv = document.createElement("div");

  const labelHeading = document.createElement("h2");
  const emailHeading = document.createElement("h3");
  const usernameHeading = document.createElement("h3");
  const passwordHeading = document.createElement("h3");

  const emailParagraph = document.createElement("p");
  const usernameParagraph = document.createElement("p");
  const passwordParagraph = document.createElement("p");

  emailDiv.classList.add("email-wrapper");
  usernameDiv.classList.add("username-wrapper");
  passwordDiv.classList.add("password-wrapper");

  labelHeading.classList.add("label-heading");
  emailHeading.classList.add("email-heading");
  usernameHeading.classList.add("username-heading");
  passwordHeading.classList.add("password-heading");

  emailParagraph.classList.add("email");
  usernameParagraph.classList.add("username");
  passwordParagraph.classList.add("password");

  labelHeading.textContent = account.label;
  emailHeading.textContent = "Email";
  usernameHeading.textContent = "Username";
  passwordHeading.textContent = "Password";

  emailParagraph.textContent = account.email;
  usernameParagraph.textContent = account.username;
  passwordParagraph.textContent = account.password;

  return {
    emailDiv,
    usernameDiv,
    passwordDiv,
    labelHeading,
    emailHeading,
    usernameHeading,
    passwordHeading,
    emailParagraph,
    usernameParagraph,
    passwordParagraph,
  };
}

function renderAllAccounts(): void {
  accountsList.innerHTML = "";

  if (accounts.length > 0) {
    accounts.forEach((account) => {
      const accountListItem = createListItem("account-item");
      const accountListItemChild = createAccountListItemChild(account);

      accountListItemChild.emailDiv.append(
        accountListItemChild.emailHeading,
        accountListItemChild.emailParagraph
      );

      accountListItemChild.usernameDiv.append(
        accountListItemChild.usernameHeading,
        accountListItemChild.usernameParagraph
      );

      accountListItemChild.passwordDiv.append(
        accountListItemChild.passwordHeading,
        accountListItemChild.passwordParagraph
      );

      accountListItem.append(
        accountListItemChild.labelHeading,
        accountListItemChild.emailDiv,
        accountListItemChild.usernameDiv,
        accountListItemChild.passwordDiv
      );

      accountsList.append(accountListItem);
    });
  } else {
    const emptyAccountListItem = createListItem("empty-account-item");
    emptyAccountListItem.textContent = "Still empty here...";
    accountsList.append(emptyAccountListItem);
  }
}

function renderNewAccount(): void {
  const accountListItem = createListItem("account-item");
  const accountListItemChild = createAccountListItemChild(
    accounts[accounts.length - 1]
  );

  accountListItemChild.emailDiv.append(
    accountListItemChild.emailHeading,
    accountListItemChild.emailParagraph
  );

  accountListItemChild.usernameDiv.append(
    accountListItemChild.usernameHeading,
    accountListItemChild.usernameParagraph
  );

  accountListItemChild.passwordDiv.append(
    accountListItemChild.passwordHeading,
    accountListItemChild.passwordParagraph
  );

  accountListItem.append(
    accountListItemChild.labelHeading,
    accountListItemChild.emailDiv,
    accountListItemChild.usernameDiv,
    accountListItemChild.passwordDiv
  );

  accountsList.append(accountListItem);
}

document.addEventListener("DOMContentLoaded", renderAllAccounts);
searchInput.addEventListener("input", searchAccounts);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (accounts.length < 1) accountsList.innerHTML = "";
  addAccount(accounts);
  renderNewAccount();
  form.reset();
});
