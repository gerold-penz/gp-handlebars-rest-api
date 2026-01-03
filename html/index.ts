import "bootstrap/dist/css/bootstrap.css"
import {version} from "../package.json"

document.querySelector("#version").innerText = version
document.querySelector("#origin").innerText = location.origin
