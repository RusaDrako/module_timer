# module_timer
JS таймер

```HTML
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script type="text/javascript" src="module.timer.js"></script>

  <div id="timer_div_1">--:--</div>

	<script type="text/javascript">
		jQuery(document).ready(function() {
			var tobj = module_timer.new('#timer_div_1', 10, () => {alert('Отсчёт завершен.'));
		});
	</script>
```
