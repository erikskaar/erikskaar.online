let defaultWidth = "25%";
let hoverWidth = "30%";
let siblingsHoverWidth = "calc(70%/3)";
let clickWidth = "60%";
let siblingsClickWidth = "calc(40%/3)"
let isClicked = 0;

function expandOnHover() {
    if(isClicked==0) {
        shrinkAllChildrenOfParent(this, siblingsHoverWidth);
        document.querySelector("#" +this.id).style.width = hoverWidth;
        document.querySelector("#" +this.id).children[1].style.visibility = "visible";
        console.log(this.id);
    } else {

    }
}
for (i=0;i<document.querySelector("#jumbotron").children.length;i++) {
    //console.log( document.querySelector("#jumbotron").children[i]);
    document.querySelector("#jumbotron").children[i].addEventListener("mouseover", expandOnHover);
    document.querySelector("#jumbotron").children[i].addEventListener("click", expandOnClick);

}
function shrinkAllChildrenOfParent(dontshrink, siblingwidth) {
    for(i=0;i<document.querySelector("#jumbotron").parentElement.children.length;i++) {
    document.querySelector("#jumbotron").children[i].style.width = siblingwidth;
    document.querySelector("#jumbotron").children[i].children[1].style.visibility = "hidden";
    }
}
function resetToDefault() {
    shrinkAllChildrenOfParent(this, defaultWidth);
}
function expandOnClick() {
    if (isClicked == 0) {
        shrinkAllChildrenOfParent(this, siblingsClickWidth);
        document.querySelector("#" +this.id).style.width = clickWidth;
        isClicked=1;
    } else {
        resetToDefault();
        isClicked=0;
    }
}

