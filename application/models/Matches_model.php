<?php
class matches_model extends CI_Model {

	public function __construct()
	{
		$this->load->database();
	}

	public function get_matches(){
		$query = $this->db->get('matches');
		return $query->result_array();
	}

	public function set_matches($data) {	
		return $this->db->insert('matches', $data);
	}

	public function record_count() {
        return $this->db->count_all("matches");
	}
	
	public function fetch_matches($limit, $start) {
        $this->db->limit($limit, $start);
        $query = $this->db->get("matches");

        if ($query->num_rows() > 0) {
            foreach ($query->result_array() as $row) {
                $data[] = $row;
            }
            return $data;
        }
        return false;
   }
}
