package org.example.shortenurl.Translator.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class TranslatorController {

    @GetMapping("/translate")
    public String translate(){
        return "translator/translateHome";
    }
}
