document.addEventListener("DOMContentLoaded", function () {
  const list = $("#resource4 #list")[0];
  let dragEle;
  let cloneEle;
  let placeholder;
  let isDraggingStarted = false;

  let x = 0;
  let y = 0;

  const swap = function (nodeA, nodeB) {
    const parentA = nodeA.parentNode;
    const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
    nodeB.parentNode.insertBefore(nodeA, nodeB);
    parentA.insertBefore(nodeB, siblingA);
  };

  const isAbove = function (nodeA, nodeB) {
    const rectA = nodeA.getBoundingClientRect();
    const rectB = nodeB.getBoundingClientRect();
    return rectA.top + rectA.height / 2 < rectB.top + rectB.height / 2;
  };

  const mouseDownHandler = function (e) {
    if (e.button == 0) {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    }
  };

  const mouseMoveHandler = function (e) {
    if (!isDraggingStarted) {
      dragEle = e.target.closest("#resource4 .draggable");
      cloneEle = dragEle.cloneNode(true);
      cloneEle.classList.add("opacity");
      dragEle.classList.add("drag");
      const draggingRect = dragEle.getBoundingClientRect();

      isDraggingStarted = true;

      dragEle.insertAdjacentElement("afterend", cloneEle);
      const rect = dragEle.getBoundingClientRect();
      x = e.pageX - rect.left + window.scrollX;
      y = e.pageY - rect.top + window.scrollY;

      placeholder = document.createElement("div");
      placeholder.classList.add("placeholder");
      dragEle.parentNode.insertBefore(placeholder, dragEle.nextSibling);
    }

    dragEle.style.top = `${e.pageY - y}px`;
    dragEle.style.left = `${e.pageX - x}px`;

    const prevEle = dragEle.previousElementSibling;
    const nextEle = placeholder.nextElementSibling;

    if (prevEle && isAbove(dragEle, prevEle)) {
      swap(placeholder, dragEle);
      swap(placeholder, prevEle);
      return;
    }

    if (nextEle && isAbove(nextEle, dragEle)) {
      swap(nextEle, placeholder);
      swap(nextEle, dragEle);
    }
  };

  const mouseUpHandler = function () {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);

    placeholder && placeholder.parentNode.removeChild(placeholder);
    cloneEle && cloneEle.parentNode.removeChild(cloneEle);

    dragEle.style.removeProperty("top");
    dragEle.style.removeProperty("left");
    dragEle.style.removeProperty("position");
    dragEle.classList.remove("drag");

    x = null;
    y = null;
    dragEle = null;
    cloneEle = null;
    isDraggingStarted = false;
  };

  [].slice.call(list.querySelectorAll(".draggable")).forEach(function (item) {
    item.addEventListener("mousedown", mouseDownHandler);
  });
});

$("#resource4 #check").click(function (e) {
  $("#resource4 .draggable").removeClass("incorrect correct");
  e.preventDefault();
  $.each($("#resource4 .draggable"), function (indexInArray, valueOfElement) {
    //console.log($(this).attr("data-id"));
    //console.log(indexInArray);
    if (+$(this).data("id") === indexInArray + 1) {
      //console.log("true");
      $(this).addClass("correct");
    } else {
      // console.log("false");
      $(this).addClass("incorrect");
    }
  });
  if ($("#resource4 .incorrect").length > 0) {
    $("#resource4 #show").show();
  } else {
    $("#resource4 #show").hide();
    //$("#reset").show();
    $("#resource4 #check").hide(); //prop("disabled", "disabled");

    $("#resource4 .draggable").css("pointer-events", "none");
  }
});
$("#resource4 #show").click(function (e) {
  e.preventDefault();
  var $wrapper = $("#resource4 #list");

  $wrapper
    .find(".draggable")
    .sort(function (a, b) {
      return +a.dataset.id - +b.dataset.id;
    })
    .appendTo($wrapper);
  $("#resource4 .draggable")
    .removeClass("incorrect correct")
    .addClass("correct");
  $("#resource4 #check, #resource4 #show").hide(); //.prop("disabled", "disabled");
  //$("#reset").show();
  $("#resource4 .draggable").css("pointer-events", "none");
});
$("#resource4 #reset").click(function (e) {
  e.preventDefault();
  $("#resource4 .draggable").removeClass("incorrect correct");
  //shuffledragchoice();
  $("#resource4 #reset").hide();
  $("#resource4 #check").show();
  $("#resource4 .draggable").css("pointer-events", "all");
});
function shuffledragchoice() {
  let ul = document.querySelector("#list");

  for (let i = ul.children.length; i >= 0; i--) {
    ul.appendChild(ul.children[(Math.random() * i) | 0]);
  }
}

//////////////////////////////////

$(document).on("click", ".fulsrcsldshw #check", function (e) {
  $(".fulsrcsldshw .draggable").removeClass("incorrect correct");
  e.preventDefault();
  $.each(
    $(".fulsrcsldshw .draggable"),
    function (indexInArray, valueOfElement) {
      //console.log($(this).attr("data-id"));
      //console.log(indexInArray);
      if (+$(this).data("id") === indexInArray + 1) {
        //console.log("true");
        $(this).addClass("correct");
      } else {
        // console.log("false");
        $(this).addClass("incorrect");
      }
    }
  );
  if ($(".fulsrcsldshw .incorrect").length > 0) {
    $(".fulsrcsldshw #show").show();
  } else {
    $(".fulsrcsldshw #show").hide();
    //$("#reset").show();
    $(".fulsrcsldshw #check").hide(); //prop("disabled", "disabled");

    $(".fulsrcsldshw .draggable").css("pointer-events", "none");
  }
});
$(document).on("click", ".fulsrcsldshw #show", function (e) {
  e.preventDefault();
  var $wrapper = $(".fulsrcsldshw #list");

  $wrapper
    .find(".draggable")
    .sort(function (a, b) {
      return +a.dataset.id - +b.dataset.id;
    })
    .appendTo($wrapper);
  $(".fulsrcsldshw .draggable")
    .removeClass("incorrect correct")
    .addClass("correct");
  $(".fulsrcsldshw #check, .fulsrcsldshw #show").hide(); //.prop("disabled", "disabled");
  //$("#reset").show();
  $(".fulsrcsldshw .draggable").css("pointer-events", "none");
});

$(document).on("click", ".fulsrcsldshw #reset", function (e) {
  e.preventDefault();
  $(".fulsrcsldshw .draggable").removeClass("incorrect correct");
  //shuffledragchoice();
  $(".fulsrcsldshw #reset").hide();
  $(".fulsrcsldshw #check").show();
  $(".fulsrcsldshw .draggable").css("pointer-events", "all");
});
