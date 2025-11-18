type Account = {
  label: string;
  email: string;
  username: string;
  password: string;
};
type Accounts = Account[];
type AccountListItemParagraphs = {
  labelParagraph: HTMLParagraphElement;
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
const accountsList = document.querySelector(".accounts") as HTMLUListElement;

function searchAccounts(): void {
  const searchQuery = searchInput.value.toLowerCase();
  const accountListItems = accountsList.getElementsByTagName("li");

  for (const accountListItem of accountListItems) {
    const isResultsFound = accountListItem.textContent
      .toLowerCase()
      .includes(searchQuery);

    if (isResultsFound) {
      accountListItem.style.display = "block";
    } else {
      accountListItem.style.display = "none";
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

function createAccountListItemParagraphs(
  account: Account
): AccountListItemParagraphs {
  const labelParagraph = document.createElement("p");
  const emailParagraph = document.createElement("p");
  const usernameParagraph = document.createElement("p");
  const passwordParagraph = document.createElement("p");

  labelParagraph.classList.add("label");
  emailParagraph.classList.add("email");
  usernameParagraph.classList.add("username");
  passwordParagraph.classList.add("password");

  labelParagraph.textContent = account.label;
  emailParagraph.textContent = account.email;
  usernameParagraph.textContent = account.username;
  passwordParagraph.textContent = account.password;

  return {
    labelParagraph,
    emailParagraph,
    usernameParagraph,
    passwordParagraph,
  };
}

function renderAllAccounts(): void {
  accountsList.innerHTML = "";

  if (accounts.length > 0) {
    accounts.forEach((account) => {
      const accountListItem = createListItem("account");
      const accountListItemParagraphs =
        createAccountListItemParagraphs(account);

      accountListItem.append(
        accountListItemParagraphs.labelParagraph,
        accountListItemParagraphs.emailParagraph,
        accountListItemParagraphs.usernameParagraph,
        accountListItemParagraphs.passwordParagraph
      );

      accountsList.append(accountListItem);
    });
  } else {
    console.log("Still empty here...");
  }
}

function renderNewAccount(): void {
  const accountListItem = createListItem("account");
  const accountListItemParagraphs = createAccountListItemParagraphs(
    accounts[accounts.length - 1]
  );

  accountListItem.append(
    accountListItemParagraphs.labelParagraph,
    accountListItemParagraphs.emailParagraph,
    accountListItemParagraphs.usernameParagraph,
    accountListItemParagraphs.passwordParagraph
  );

  accountsList.append(accountListItem);
}

document.addEventListener("DOMContentLoaded", renderAllAccounts);
searchInput.addEventListener("input", searchAccounts);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addAccount(accounts);
  renderNewAccount();
});
