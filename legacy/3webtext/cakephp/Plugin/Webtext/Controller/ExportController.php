<?php

class ExportController extends WebtextAppController {

		var $login_post_url;
		var $texturl;
		var $send_texturl;
		var $login_string;
		var $send_message_string;
		var $loginpageresult;
		var $textpageresult;
		var $sendmessageresult;
		var $messagesleft;
		var $cookie;
		var $cookiedir = 'cookiebank';			//Make sure to create a directory called cookiebank and CHMOD to 733
		
	public function index(){
		
		
		if(isset($this->data) && !empty($this->data)):
			$u = $this->data['Export']['username'];
			$p = $this->data['Export']['pin'];
			
			$ret = $this->login($u,$p);
			if ($ret < 0):
				$this->Session->setFlash('Invalid login details', 'default', array('class' => 'fail'));
			else:
				$this->Session->setFlash('Logged in', 'default', array('class' => 'success'));
				$content = $this->get_table();
				
				print_r($content);
				
				$content = file_get_contents('http://webtext.three.ie/manageContacts.jsp');
				
				print_r($content);
				
			endif;
			/*
			var_dump($this->loginpageresult);
			*/
			
			//$this->delete_cookie();	
		endif;
		
		
	
	}
	
	private function set_the_cookie($u)
	{
		srand((double)microtime()*1000000); 
		$this->cookie = $u.rand(1,100000);
	}

	private function delete_cookie()
	{
		unlink(dirname(__FILE__)."/$this->cookiedir/$this->cookie");
	}
	
	private function goto_text_page()
	{
		return 1;
	}
	
	private function login($u,$p)
	{
		$this->set_the_cookie($u);
		$this->login_post_url = 'http://webtext.three.ie/processLogin.jsp';
		$this->login_string = "mobile=$u&pin=$p&serviceId=19088&originCountryPrefix=353";
		
		
		$url=$this->login_post_url."?".$this->login_string;
		
		$this->loginpageresult=$this->curl_url($url,"get");
		
		if (strstr($this->loginpageresult, "Invalid login")){
			return -1;
		} else {
			$url="http://webtext.three.ie/manageGroups.jsp";
			$this->loginpageresult = $this->curl_url($url, "get");
			return 1;
		}
	}
	
	
	private function get_table()
	{
		$url="http://webtext.three.ie/send.jsp";
		return $this->curl_url($url,"get");
	}
	
	private function get_table_eile()
	{
		$url="http://webtext.three.ie/manageContacts.jsp";
		return $this->curl_url($url,"get");
	}

	public function login_success(){

	}
	
	private function curl_url($tUrl,$method)
	{
		$str="";
		if($method=="post")
		{
			$sp=explode("?",$tUrl);
			$tUrl=$sp[0];
			$str=$sp[1];
		}
		
		$ch = curl_init ($tUrl);
		curl_setopt ($ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt ($ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
		curl_setopt($ch, CURLOPT_URL,$tUrl);
		curl_setopt($ch, CURLOPT_HEADER, 0); 
		curl_setopt($ch, CURLOPT_COOKIEFILE, dirname(__FILE__)."/$this->cookiedir/$this->cookie");
		curl_setopt($ch, CURLOPT_COOKIEJAR, dirname(__FILE__)."/$this->cookiedir/$this->cookie");
		
		if($method=="post")
		{
			curl_setopt($ch, CURLOPT_POST, 1); 
			curl_setopt($ch, CURLOPT_POSTFIELDS, $str);
		}
		else
		{
			curl_setopt($ch, CURLOPT_POST, 0); 
		}
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
		curl_setopt($ch, CURLOPT_REFERER, "http://google.ie"); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
		$tRes = curl_exec($ch);
		curl_close($ch); 
		return $tRes;
	}

}

?>