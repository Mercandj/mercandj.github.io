<?php
    if(/*isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['email']) && */isset($_POST['text'])){
        //$first_name = stripslashes(htmlspecialchars($_POST['first_name'])); 
        //$last_name = stripslashes(htmlspecialchars($_POST['last_name'])); 
        //$sender = stripslashes($_POST['email']); 
        $text = stripslashes(htmlspecialchars($_POST['text']));
        /*
        $regex_mail = '/^[-+.\w]{1,64}@[-.\w]{1,64}\.[-.\w]{2,6}$/i';
        $regex_head = '/[\n\r]/';

        if (empty($first_name) || empty($last_name) || empty($sender) || empty($text)){
            exit();
        }elseif(strlen($msg) == 0 || strlen($first_name) == 0 || strlen($last_name) == 0){
            exit();
        }elseif (!preg_match($regex_mail, $sender)){
            exit();
        }elseif (preg_match($regex_head, $sender) || preg_match($regex_head, $first_name)){
            exit();
        }elseif (preg_match($regex_head, $sender) || preg_match($regex_head, $last_name)){
            exit();
        }else{
        */
            if(strlen($text) > 300) $text = substr($text, 0,300);
            //if(strlen($first_name) > 25) $first_name = substr($first_name, 0,25);
            //if(strlen($last_name) > 25) $last_name = substr($last_name, 0,25);

            $counter_name = "index_message.txt";
            // Check if a text file exists. If not create one and initialize it to zero.
            if (!file_exists($counter_name)) {
                $f = fopen($counter_name, "w");
                $json['count'] = 0;
                fwrite($f,json_encode($json, JSON_NUMERIC_CHECK));
                fclose($f);
            }
            // Read the current value of our counter file
            $f = fopen($counter_name,"r");
            $json = json_decode(fread($f, filesize($counter_name)), true);
            fclose($f);
            // Has visitor been counted in this session?
            // If not, increase counter value by one
            if(!isset($_SESSION['hasVisited'])){
                $_SESSION['hasVisited']="yes";
                $json['count'] = $json['count'] + 1;

                //$json[$json['count']]['date'] = date("Y-m-d H:i:s");
                //$json[$json['count']]['first_name'] = $first_name;
                //$json[$json['count']]['last_name'] = $last_name;
                //$json[$json['count']]['sender'] = $sender;
                $json[$json['count']]['text'] = $text;

                $f = fopen($counter_name, "w");
                fwrite($f, json_encode($json));
                fclose($f);
            }

            header("Location: {$_SERVER['HTTP_REFERER']}");
            exit;
        //}
    }
?>