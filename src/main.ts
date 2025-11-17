type Account = {
  label: string;
  email: string;
  username: string;
  password: string;
};
type Accounts = Account[];

const accounts: Accounts = [];
const searchInputEl = document.querySelector(".search") as HTMLInputElement;
const formEl = document.querySelector(".form") as HTMLFormElement;
const labelInputEl = document.querySelector(".label") as HTMLInputElement;
const emailInputEl = document.querySelector(".email") as HTMLInputElement;
const usernameInputEl = document.querySelector(".username") as HTMLInputElement;
const passwordInputEl = document.querySelector(".password") as HTMLInputElement;
const accountsUlEl = document.querySelector(".accounts") as HTMLUListElement;

function searchAccounts() {
  const searchQuery = searchInputEl.value.toLowerCase();
  const lists = accountsUlEl.getElementsByTagName("li");
  for (const list of lists) {
    if (list.textContent.toLowerCase().includes(searchQuery)) {
      list.style.display = "block";
    } else {
      list.style.display = "none";
    }
  }
}

function addAccount(e: SubmitEvent) {
  e.preventDefault();
  const account: Account = {
    label: labelInputEl.value,
    email: emailInputEl.value,
    username: usernameInputEl.value,
    password: passwordInputEl.value,
  };
  accounts.push(account);
  renderAccounts();
}

function renderAccounts() {
  accountsUlEl.innerHTML = "";
  accounts.forEach((account) => {
    const liEl = document.createElement("li") as HTMLLIElement;
    const labelEl = document.createElement("p") as HTMLParagraphElement;
    const emailEl = document.createElement("p") as HTMLParagraphElement;
    const usernameEl = document.createElement("p") as HTMLParagraphElement;
    const passwordEl = document.createElement("p") as HTMLParagraphElement;
    liEl.classList.add("account");
    labelEl.classList.add("label");
    emailEl.classList.add("email");
    usernameEl.classList.add("username");
    passwordEl.classList.add("password");
    labelEl.textContent = account.label;
    emailEl.textContent = account.email;
    usernameEl.textContent = account.username;
    passwordEl.textContent = account.password;
    liEl.append(labelEl, emailEl, usernameEl, passwordEl);
    accountsUlEl.append(liEl);
  });
}

searchInputEl.addEventListener("input", searchAccounts);
formEl.addEventListener("submit", addAccount);
