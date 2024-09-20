package org.example.shortenurl.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(){
        return "home";
    }

    @GetMapping("/urlInfo")
    public String urlInfo(){
        return "url/urlInfo";
    }

    @GetMapping("/urlList")
    public String urlList(){
        return "url/urlList";
    }

    @GetMapping("/postList")
    public String postList(){
        return "post/postList";
    }

    @GetMapping("/posting")
    public String posting(){
        return "post/postWrite";
    }

    @GetMapping("/post/{postId}")
    public String post(){
        return "post/postView";
    }

    @GetMapping("/post/modify/{postId}")
    public String getPostModifyInfo(@PathVariable Long postId){
        return "post/postModify";
    }
}
