<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Matches extends CI_Controller {

	public function __construct() {
		parent::__construct();
		$this->load->model('matches_model');
		$this->load->helper('url_helper');
		$this->load->library("pagination");
	}

	public function store() {
		
		$data = array (
			'player1' => $this->input->post('player1'),
			'player2' => $this->input->post('player2'),
			'winner' => $this->input->post('winner'),
			'draw' => $this->input->post('draw')
		);
		//Sending to the model
		$this->matches_model->set_matches($data);
		$this->load->view('templates/footer');
	}

	public function results() {
		//Page title
		$data['title'] = "Results - Tic Tac Toe";	
		
		//Pagination
		$config = array();
        $config["base_url"] = base_url() . "matches/results";
        $config["total_rows"] = $this->matches_model->record_count();
        $config["per_page"] = 10;
        $config["uri_segment"] = 3;

        $this->pagination->initialize($config);

		$page = ($this->uri->segment(3)) ? $this->uri->segment(3) : 0;
		//Matches
        $data["matches"] = $this->matches_model->fetch_matches($config["per_page"], $page);
        $data["links"] = $this->pagination->create_links();
		//Loading template files
		$this->load->view('templates/header', $data);
        $this->load->view('results', $data);
		$this->load->view('templates/footer');
	}
}
