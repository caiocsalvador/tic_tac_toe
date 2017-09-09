<?php
class matches_model extends CI_Model {
	
	public function __construct()
	{
		$this->load->database();
	}	
	//Get all matches
	public function get_matches(){
		$query = $this->db->get('matches');
		return $query->result_array();
	}
	//Save matches
	public function set_matches($data) {	
		return $this->db->insert('matches', $data);
	}
	//Return the numbers of matches stored to the database
	public function record_count() {
        return $this->db->count_all("matches");
	}
	//Return an array of matches
	public function fetch_matches($limit, $start) {
		//Order - Newest to older
		$this->db->order_by("id", "desc");
		//Set a limit
        $this->db->limit($limit, $start);
		$query = $this->db->get("matches");
		//Check if has matches
        if ($query->num_rows() > 0) {
            foreach ($query->result_array() as $row) {
                $data[] = $row;
            }
            return $data;
        }
        return false;
   }
}
