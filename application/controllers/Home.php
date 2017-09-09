<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {

	public function __construct() {
			parent::__construct();
			$this->load->model('matches_model');
			$this->load->helper('url_helper');
	}

	public function index() {
		$data['title'] = "Tic Tac Toe";

		$this->load->view('templates/header', $data);
        $this->load->view('home', $data);
        $this->load->view('templates/footer');
	}

	public function store() {
		
		$data = array (
			'player' => $this->input->post('player'),
			'draw' => $this->input->post('draw')
		);

		$this->matches_model->set_matchs($data);
	}
}
