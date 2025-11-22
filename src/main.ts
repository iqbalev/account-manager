/*
  To Do:
    - [Done] Add delete account.
    - Add edit account.
    - [Done] Add empty text placeholder.
    - [Done] Add copy to clipboard.
    - [Done] Add validation.
    - [Done] Don't render empty elements OR add default text if there are no inputs.
*/

type Account = {
  id: string;
  label: string;
  email?: string;
  username?: string;
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
  deleteButton: HTMLButtonElement;
  copyEmailButton: HTMLButtonElement;
  copyUsernameButton: HTMLButtonElement;
  copyPasswordButton: HTMLButtonElement;
};

let accounts: Accounts = [];

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
    id: Math.floor(Math.random() + Date.now()).toString(),
    label: labelInput.value,
    email: emailInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
  };

  return [...accounts, account];
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

  const labelHeading = document.createElement("h2");
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

  labelHeading.classList.add("label-heading");
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

  labelHeading.textContent = account.label;
  emailHeading.textContent = "Email";
  usernameHeading.textContent = "Username";
  passwordHeading.textContent = "Password";

  emailParagraph.textContent = account.email || "Not required";
  usernameParagraph.textContent = account.username || "Not required";
  passwordParagraph.textContent = account.password;

  deleteButton.textContent = "Delete";
  copyEmailButton.textContent = "Copy";
  copyUsernameButton.textContent = "Copy";
  copyPasswordButton.textContent = "Copy";

  emailParagraph.style.fontStyle = account.email ? "normal" : "italic";
  usernameParagraph.style.fontStyle = account.username ? "normal" : "italic";

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

  accountListItemChild.emailDiv.append(
    accountListItemChild.emailHeading,
    accountListItemChild.emailParagraph
  );

  if (accountListItemChild.emailParagraph.textContent !== "Not required") {
    accountListItemChild.emailDiv.append(accountListItemChild.copyEmailButton);
  }

  accountListItemChild.usernameDiv.append(
    accountListItemChild.usernameHeading,
    accountListItemChild.usernameParagraph
  );

  if (accountListItemChild.usernameParagraph.textContent !== "Not required") {
    accountListItemChild.usernameDiv.append(
      accountListItemChild.copyUsernameButton
    );
  }

  accountListItemChild.passwordDiv.append(
    accountListItemChild.passwordHeading,
    accountListItemChild.passwordParagraph
  );

  if (accountListItemChild.passwordParagraph.textContent !== "Not required") {
    accountListItemChild.passwordDiv.append(
      accountListItemChild.copyPasswordButton
    );
  }

  accountListItem.append(
    accountListItemChild.labelHeading,
    accountListItemChild.deleteButton,
    accountListItemChild.emailDiv,
    accountListItemChild.usernameDiv,
    accountListItemChild.passwordDiv
  );

  accountsList.append(accountListItem);
}

/* 
  ** Temporarily disable until adding persistent storage **
  document.addEventListener("DOMContentLoaded", renderAllAccounts);
*/

searchInput.addEventListener("input", searchAccounts);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (accounts.length < 1) accountsList.innerHTML = "";
  accounts = addAccount(accounts);
  const newAccount = accounts[accounts.length - 1];
  renderNewAccount(newAccount);
  form.reset();
});

accountsList.addEventListener("click", (e) => {
  if (!(e.target instanceof Element)) return;
  const target = e.target;
  const parent = target.parentElement;
  const isDeleteButton = target.matches(".delete");
  const isCopyButton = target.matches(".copy");
  if (isDeleteButton && parent) {
    const accountsAfterDeletion = accounts.filter(
      (account) => account.id !== parent.dataset.id
    );
    accounts = accountsAfterDeletion;
    parent.remove();
  }
  if (isCopyButton && parent) {
    const paragraph = parent.querySelector("p");
    if ("clipboard" in navigator && paragraph) {
      navigator.clipboard.writeText(paragraph.textContent);
    }
  }
});
