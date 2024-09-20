import loadingData from "./loadingData";
import setupCommentForm from "./addComment";
import setupCommentDelete from "./deleteComment";
import setupUtilBtn from "./utilBtns";
import setupPostDelete from "./deletePost";


loadingData(); //데이터 불러오기
setupCommentForm(); //댓글추가 로직
setupCommentDelete(); //댓글 삭제 로직
setupPostDelete(); //포스트 삭제 로직
setupUtilBtn(); //버튼들 기능 로직



