/*
  To Do:
    - [Done] Add delete account.
    - Add edit account.
    - [Done] Add empty text placeholder.
    - [Done] Add copy to clipboard.
    - [Done] Add validation.
    - [Done] Don't render empty elements OR add default text if there are no inputs.
    - Integrate IndexedDB for persistent storage.
    - Add PWA support.
*/

type Account = {
  id: string;
  accountName: string;
  email?: string;
  username?: string;
  password: string;
};
type Accounts = Account[];
type AccountListItemChild = {
  emailDiv: HTMLDivElement;
  usernameDiv: HTMLDivElement;
  passwordDiv: HTMLDivElement;
  accountNameHeading: HTMLHeadingElement;
  emailHeading: HTMLHeadingElement;
  usernameHeading: HTMLHeadingElement;
  passwordHeading: HTMLHeadingElement;
  emailParagraph: HTMLParagraphElement;
  usernameParagraph: HTMLParagraphElement;
  passwordParagraph: HTMLParagraphElement;
  deleteButton: HTMLButtonElement;
  copyEmailButton: HTMLButtonElement;
  copyUsernameButton: HTMLButtonElement;
  copyPasswordButton: HTMLButtonElement;
};

let accounts: Accounts = [];

const searchInput = document.querySelector(".search") as HTMLInputElement;
const addButton = document.querySelector(".button.add") as HTMLButtonElement;
const closeButton = document.querySelector(
  ".button.close"
) as HTMLButtonElement;
const modal = document.querySelector(".modal") as HTMLDialogElement;
const form = document.querySelector(".form") as HTMLFormElement;
const accountNameInput = document.querySelector(
  ".account-name-input"
) as HTMLInputElement;
const emailInput = document.querySelector(".email-input") as HTMLInputElement;
const usernameInput = document.querySelector(
  ".username-input"
) as HTMLInputElement;
const passwordInput = document.querySelector(
  ".password-input"
) as HTMLInputElement;
const accountsList = document.querySelector(
  ".accounts-list"
) as HTMLUListElement;

function createAccount(): Account {
  return {
    id: Math.floor(Math.random() + Date.now()).toString(),
    accountName: accountNameInput.value,
    email: emailInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
  };
}

function deleteAccount(accounts: Accounts, target: HTMLElement): Accounts {
  return accounts.filter((account) => account.id !== target.dataset.id);
}

function searchAccounts(): void {
  const searchQuery = searchInput.value.toLowerCase();
  const accountNameHeadings = accountsList.getElementsByTagName("h2");

  for (const accountNameHeading of accountNameHeadings) {
    const isResultsFound = accountNameHeading.textContent
      .toLowerCase()
      .includes(searchQuery);

    const parent = accountNameHeading.parentElement;
    if (parent) {
      parent.style.display = isResultsFound ? "" : "none";
    }
  }
}

function copyToClipboard(target: HTMLElement): void {
  if ("clipboard" in navigator && target) {
    /* 
    I have to use .childNodes instead of .textContent directly because the "Copy" button is the child of the element I want to target. 
    If not, the target text will also include the child (the "Copy" button) text value.
    */
    let targetText = "";
    target.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        targetText += node.nodeValue;
      }
    });

    navigator.clipboard
      .writeText(targetText)
      .then()
      .catch((error) => console.log(error));
  }
}

function createListItem(className: string, dataId: string): HTMLLIElement {
  const listItem = document.createElement("li");
  listItem.dataset.id = dataId;
  listItem.classList.add(className);
  return listItem;
}

function createAccountListItemChild(account: Account): AccountListItemChild {
  const emailDiv = document.createElement("div");
  const usernameDiv = document.createElement("div");
  const passwordDiv = document.createElement("div");

  const accountNameHeading = document.createElement("h2");
  const emailHeading = document.createElement("h3");
  const usernameHeading = document.createElement("h3");
  const passwordHeading = document.createElement("h3");

  const emailParagraph = document.createElement("p");
  const usernameParagraph = document.createElement("p");
  const passwordParagraph = document.createElement("p");

  const deleteButton = document.createElement("button");
  const copyEmailButton = document.createElement("button");
  const copyUsernameButton = document.createElement("button");
  const copyPasswordButton = document.createElement("button");

  emailDiv.classList.add("email-wrapper");
  usernameDiv.classList.add("username-wrapper");
  passwordDiv.classList.add("password-wrapper");

  accountNameHeading.classList.add("account-name-heading");
  emailHeading.classList.add("email-heading");
  usernameHeading.classList.add("username-heading");
  passwordHeading.classList.add("password-heading");

  emailParagraph.classList.add("email");
  usernameParagraph.classList.add("username");
  passwordParagraph.classList.add("password");

  deleteButton.classList.add("button", "delete");
  copyEmailButton.classList.add("button", "copy");
  copyUsernameButton.classList.add("button", "copy");
  copyPasswordButton.classList.add("button", "copy");

  accountNameHeading.textContent = account.accountName;
  emailHeading.textContent = "Email";
  usernameHeading.textContent = "Username";
  passwordHeading.textContent = "Password";

  emailParagraph.textContent = account.email || "";
  usernameParagraph.textContent = account.username || "";
  passwordParagraph.textContent = account.password;

  deleteButton.textContent = "Delete";
  copyEmailButton.textContent = "Copy";
  copyUsernameButton.textContent = "Copy";
  copyPasswordButton.textContent = "Copy";

  return {
    emailDiv,
    usernameDiv,
    passwordDiv,
    accountNameHeading,
    emailHeading,
    usernameHeading,
    passwordHeading,
    emailParagraph,
    usernameParagraph,
    passwordParagraph,
    deleteButton,
    copyEmailButton,
    copyUsernameButton,
    copyPasswordButton,
  };
}

/*
  ** Temporarily disabled until adding persistent storage **
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
*/

function renderNewAccount(account: Account): void {
  const accountListItem = createListItem("account-item", account.id);
  const accountListItemChild = createAccountListItemChild(account);

  accountListItem.append(accountListItemChild.accountNameHeading);

  if (accountListItemChild.emailParagraph.textContent !== "") {
    accountListItemChild.emailParagraph.append(
      accountListItemChild.copyEmailButton
    );

    accountListItemChild.emailDiv.append(
      accountListItemChild.emailHeading,
      accountListItemChild.emailParagraph
    );

    accountListItem.append(accountListItemChild.emailDiv);
  }

  if (accountListItemChild.usernameParagraph.textContent !== "") {
    accountListItemChild.usernameParagraph.append(
      accountListItemChild.copyUsernameButton
    );

    accountListItemChild.usernameDiv.append(
      accountListItemChild.usernameHeading,
      accountListItemChild.usernameParagraph
    );

    accountListItem.append(accountListItemChild.usernameDiv);
  }

  if (accountListItemChild.passwordParagraph.textContent !== "") {
    accountListItemChild.passwordParagraph.append(
      accountListItemChild.copyPasswordButton
    );

    accountListItemChild.passwordDiv.append(
      accountListItemChild.passwordHeading,
      accountListItemChild.passwordParagraph
    );

    accountListItem.append(accountListItemChild.passwordDiv);
  }

  accountListItem.append(accountListItemChild.deleteButton);
  accountsList.append(accountListItem);
}

/* 
  ** Temporarily disable until adding persistent storage **
  document.addEventListener("DOMContentLoaded", renderAllAccounts);
*/

searchInput.addEventListener("input", searchAccounts);

addButton.addEventListener("click", () => {
  modal.showModal();
  accountNameInput.focus();
});

closeButton.addEventListener("click", () => modal.close());

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (accounts.length < 1) accountsList.innerHTML = "";
  accounts = [...accounts, createAccount()];
  renderNewAccount(accounts[accounts.length - 1]);

  modal.close();
  form.reset();
});

accountsList.addEventListener("click", (e) => {
  if (!(e.target instanceof Element)) return;

  const parent = e.target.parentElement;
  if (!parent) return;

  if (e.target.matches(".delete")) {
    accounts = deleteAccount(accounts, parent);
    parent.remove();
  }

  if (e.target.matches(".copy")) {
    copyToClipboard(parent);
  }
});
