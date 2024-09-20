/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./postView/addComment.js":
/*!********************************!*\
  !*** ./postView/addComment.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setupCommentForm)\n/* harmony export */ });\n/*\r\n* 댓글 등록 동작\r\n*  **/\n\n/**\r\n * InputData: CommentEntityResponse\r\n * */\n\nfunction setupCommentForm() {\n  document.addEventListener('DOMContentLoaded', function () {\n    const commentForm = document.querySelector('#commentForm');\n    commentForm.addEventListener('submit', function (event) {\n      event.preventDefault();\n      addComment();\n    });\n  });\n}\n\n//댓글 추가\nfunction addComment() {\n  const author = document.querySelector('#comment-author').value;\n  const password = document.querySelector('#comment-password').value;\n  const body = document.querySelector('#comment-body').value;\n  const postId = document.querySelector('#post-div').getAttribute('data-postId');\n  const requestObject = {\n    author: author,\n    password: password,\n    body: body,\n    postId: postId\n  };\n  fetch('/addComment', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(requestObject)\n  }).then(response => {\n    //성공로직\n    if (response.status == 200) {\n      window.location.href = '/post/' + postId; // 게시글 목록 페이지로 이동\n    } else {\n      throw new Error(\"게시글 등록 실패\"); // 에러 발생\n    }\n  }).catch(error => {\n    console.log(error);\n  });\n}\n\n//# sourceURL=webpack:///./postView/addComment.js?");

/***/ }),

/***/ "./postView/deleteComment.js":
/*!***********************************!*\
  !*** ./postView/deleteComment.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setupCommentDelete)\n/* harmony export */ });\nlet currentCommentId = null;\nfunction setupCommentDelete() {\n  document.addEventListener('DOMContentLoaded', function () {\n    document.querySelector('#commentDeleteForm').addEventListener('submit', async function (event) {\n      event.preventDefault();\n      const commentPassword = document.querySelector('#commentPasswordInput').value;\n\n      // validateCommentPassword 함수를 비동기적으로 호출\n      const isValid = await validateCommentPassword(currentCommentId, commentPassword);\n      if (isValid) {\n        alert(\"댓글이 삭제되었습니다.\");\n        window.location.reload(); // 페이지 새로 고침\n      } else {\n        alert(\"비밀번호가 일치하지 않습니다.\");\n      }\n    });\n\n    // [지우기] 버튼 클릭 시 currentCommentId 정보 갱신\n    document.addEventListener('click', function (e) {\n      if (e.target.classList.contains('delete-button')) {\n        currentCommentId = e.target.getAttribute('data-comment-id'); // 댓글 ID 저장\n      }\n    });\n  });\n}\nasync function validateCommentPassword(id, password) {\n  const requestObject = {\n    id: id,\n    password: password\n  };\n  try {\n    const response = await fetch('/comment/deleteComment', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(requestObject)\n    });\n\n    // 성공 로직\n    return response.status === 200; // true 또는 false 반환\n  } catch (error) {\n    console.error('오류 발생:', error);\n    return false;\n  }\n}\n\n//# sourceURL=webpack:///./postView/deleteComment.js?");

/***/ }),

/***/ "./postView/deletePost.js":
/*!********************************!*\
  !*** ./postView/deletePost.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setupPostDelete)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./utils.js\");\n\nfunction setupPostDelete() {\n  document.addEventListener('DOMContentLoaded', function () {\n    document.querySelector('#postDeleteForm').addEventListener('submit', async function (event) {\n      event.preventDefault();\n      const postPassword = document.querySelector('#postPasswordInput').value;\n      const postId = document.querySelector('#post-div').getAttribute('data-postId');\n\n      // validateCommentPassword 함수를 비동기적으로 호출\n      const isValid = await (0,_utils__WEBPACK_IMPORTED_MODULE_0__.validatePostPassword)(postId, postPassword);\n      if (isValid) {\n        alert(\"게시글이 삭제되었습니다.\");\n        window.location.href = \"/postList\";\n      } else {\n        alert(\"비밀번호가 일치하지 않습니다.\");\n      }\n    });\n  });\n}\n\n//# sourceURL=webpack:///./postView/deletePost.js?");

/***/ }),

/***/ "./postView/index.js":
/*!***************************!*\
  !*** ./postView/index.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loadingData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadingData */ \"./postView/loadingData.js\");\n/* harmony import */ var _addComment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./addComment */ \"./postView/addComment.js\");\n/* harmony import */ var _deleteComment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deleteComment */ \"./postView/deleteComment.js\");\n/* harmony import */ var _utilBtns__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utilBtns */ \"./postView/utilBtns.js\");\n/* harmony import */ var _deletePost__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./deletePost */ \"./postView/deletePost.js\");\n\n\n\n\n\n(0,_loadingData__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(); //데이터 불러오기\n(0,_addComment__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(); //댓글추가 로직\n(0,_deleteComment__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(); //댓글 삭제 로직\n(0,_deletePost__WEBPACK_IMPORTED_MODULE_4__[\"default\"])(); //포스트 삭제 로직\n(0,_utilBtns__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(); //버튼들 기능 로직\n\n//# sourceURL=webpack:///./postView/index.js?");

/***/ }),

/***/ "./postView/loadingData.js":
/*!*********************************!*\
  !*** ./postView/loadingData.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ loadingData)\n/* harmony export */ });\n/*\r\n* 글,댓글 데이터 불러오기 동작\r\n* **/\nfunction loadingData() {\n  document.addEventListener('DOMContentLoaded', function () {\n    // URL에서 ID 추출\n    const postId = window.location.pathname.split(\"/\").pop(); // 예: /post/1 -> 1\n    const requestUrl = `/postView/${postId}`;\n    fetch(requestUrl).then(response => {\n      if (response.ok) {\n        return response.json();\n      } else {\n        throw new Error(\"게시물을 가져오는데 실패했습니다.\");\n      }\n    }).then(post => {\n      document.querySelector('#post-div').setAttribute('data-postId', post.postId);\n      document.querySelector('#titleTv').innerHTML = post.title;\n      document.querySelector('#authorTv').innerHTML = post.author;\n      document.querySelector('#bodyTv').innerHTML = post.body;\n      document.querySelector('#upVotesTv').innerHTML = post.upVotes;\n      document.querySelector('#dislikeVotesTv').innerHTML = post.dislikeVotes;\n      document.title = post.title;\n      post.comments.forEach(comment => {\n        const cardDom = document.createElement('div');\n        cardDom.classList.add('card');\n        cardDom.innerHTML = `\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">${comment.author}</h5>\n                        <p class=\"card-text\">${comment.body}</p>\n                        <p class=\"card-text\"><small class=\"text-muted\">${dateFormat(comment.createdDate)}</small></p>\n                        <button class=\"btn btn-danger btn-sm delete-button\" data-comment-id=\"${comment.id}\" data-bs-toggle=\"modal\" data-bs-target=\"#commentPasswordModal\">지우기</button>\n                    </div>\n                    `;\n        document.querySelector('#cardListDiv').appendChild(cardDom);\n      });\n    }).catch(error => {\n      console.log(error);\n      alert(error);\n    });\n  });\n}\nfunction dateFormat(createdDate) {\n  const date = new Date(createdDate);\n  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;\n}\n\n//# sourceURL=webpack:///./postView/loadingData.js?");

/***/ }),

/***/ "./postView/utilBtns.js":
/*!******************************!*\
  !*** ./postView/utilBtns.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setupUtilBtn)\n/* harmony export */ });\n/*\r\n[ 버튼 동작 ]\r\n* 1.추천(완료)\r\n* 2.비추천(완료)\r\n* 3.돌아가기 (완료)\r\n* 4.수정\r\n* **/\nfunction setupUtilBtn() {\n  document.addEventListener('DOMContentLoaded', function () {\n    //1.추천\n    document.querySelector('#likeBtn').addEventListener('click', function (event) {\n      event.preventDefault();\n      SetupVoteBtn('LIKE');\n    });\n    //2.비추천\n    document.querySelector('#dislikeBtn').addEventListener('click', function (event) {\n      event.preventDefault();\n      SetupVoteBtn('DISLIKE');\n    });\n    //3.돌아가기\n    document.querySelector('#backBtn').addEventListener('click', function (event) {\n      event.preventDefault();\n      SetupBackBtn();\n    });\n    document.querySelector('#modifyBtn').addEventListener('click', function (event) {\n      event.preventDefault();\n      SetupModifyBtn();\n    });\n  });\n}\nfunction SetupModifyBtn() {\n  const postId = document.querySelector('#post-div').getAttribute('data-postId');\n  window.location.href = `/post/modify/${postId}`;\n}\nfunction SetupVoteBtn(voteType) {\n  /*\r\n  private Long postId;\r\n  private VoteType voteType;\r\n  * **/\n  const requestUrl = '/post/recommend';\n  const postId = document.querySelector('#post-div').getAttribute('data-postId');\n  const requestObject = {\n    postId: postId,\n    voteType: voteType\n  };\n  fetch(requestUrl, {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(requestObject)\n  }).then(response => {\n    if (response.status == 200) {\n      return response.json();\n    } else {\n      throw new Error(\"error\"); // 에러 발생\n    }\n  }).then(data => {\n    /*  [ data ]\r\n    * private Long upVotes;\r\n      private Long dislikeVotes;\r\n      * **/\n    document.querySelector('#upVotesTv').innerHTML = data.upVotes;\n    document.querySelector('#dislikeVotesTv').innerHTML = data.dislikeVotes;\n  }).catch(error => {\n    alert(error);\n  });\n}\nfunction SetupBackBtn() {\n  const previousUrl = document.referrer;\n  if (previousUrl) {\n    window.location.href = previousUrl;\n  } else {\n    window.location.href = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/postList';\n  }\n}\n\n//# sourceURL=webpack:///./postView/utilBtns.js?");

/***/ }),

/***/ "./utils.js":
/*!******************!*\
  !*** ./utils.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   showAlert: () => (/* binding */ showAlert),\n/* harmony export */   validatePostPassword: () => (/* binding */ validatePostPassword)\n/* harmony export */ });\nfunction showAlert(isCheck, message) {\n  const bodyDom = document.querySelector('body');\n  const alertDiv = document.createElement('div');\n  alertDiv.classList.add('alert', 'mx-auto', 'w-25', 'mt-2');\n  alertDiv.innerHTML = message;\n  if (isCheck) {\n    alertDiv.classList.add('alert-success');\n  } else {\n    alertDiv.classList.add('alert-danger');\n  }\n  bodyDom.appendChild(alertDiv);\n  setTimeout(() => {\n    alertDiv.remove();\n  }, 3000);\n}\nasync function validatePostPassword(id, password) {\n  /*  [PostPasswordCheckRequest]\r\n  *   private Long id;\r\n      private String password;\r\n  * **/\n  const requestObject = {\n    id: id,\n    password: password\n  };\n  const requestUrl = `/post/passwordCheck`;\n  try {\n    const response = await fetch(requestUrl, {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(requestObject)\n    });\n    // 성공 로직\n    return response.status === 200; // true 또는 false 반환\n  } catch (error) {\n    console.error('오류 발생:', error);\n    return false;\n  }\n}\n\n//# sourceURL=webpack:///./utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./postView/index.js");
/******/ 	
/******/ })()
;