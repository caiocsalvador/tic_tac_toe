<div class="container">
<h2>Matches results</h2>
	<div class="cont-results">
		<table class="table table-striped table-responsive">
			<thead>
				<tr>
					<th>Player 1</th>
					<th>Player 2</th>
					<th>Winner / Draw</th>
					<th>Date and Time</th>
				</tr>
			</thead>
			<tbody>
			<? foreach ($matches as $match): ?>		
				<tr>
					<td><?= $match['player1']; ?></td>
					<td><?= $match['player2']; ?></td>
					<? if($match['winner'] !== ""): ?>
						<td><?= $match['winner']; ?></td>
					<? else: ?>
						<td>Draw</td>
					<? endif;?>
					<td><?= date('d M Y \- H:m:i', strtotime($match['datetime'])); ?></td>
				</tr>
			<? endforeach; ?>
			</tbody>
		</table>
		<div class="pagination">
			<?php echo $links; ?>
		</div>	
	</div>	
</div>
