export const regex = {
  username: /^[a-zA-Z\s]*$/,
  password: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, //https://gist.github.com/arielweinberger/18a29bfa17072444d45adaeeb8e92ddc
  number: /^[0-9]*$/,
}
