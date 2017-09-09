<!DOCTYPE html>
<html lang="en">
  	<head>
		<!-- Required meta tags -->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/6.6.10/sweetalert2.min.css">
		<link rel="stylesheet" href="<?=base_url();?>static/css/style.css">
		<link rel="shortcut icon" type="image/png" href="<?=base_url();?>static/img/favicon.png"/>

		<title><?= $title; ?></title>
  	</head>
  	<body>
	  	<? $is_home = ($this->router->fetch_class() === 'home' && $this->router->fetch_method() === 'index') ? true : false; ?>
		<header>
			<div class="container">
			  	<nav class="navbar navbar-expand-lg navbar-light bg-light">
					<a class="navbar-brand" href="<?php echo site_url(''); ?>">Tic Tac Toe</a>
					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">							
							<li class="nav-item <?=$is_home ? 'active' : ''?>">
								<a class="nav-link" href="<?php echo site_url(''); ?>">Home</a>
							</li>
							<li class="nav-item <?=$is_home ? '' : 'active'?>">
								<a class="nav-link" href="<?php echo site_url('/results'); ?>">Results</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
