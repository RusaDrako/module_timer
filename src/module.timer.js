/** Тестировалось на библиотеки jQuery v3.2.1 */

// Включаем строгий режим
"use strict";



/** */
(function($) {
	/** Имя модуля */
	var MODULE_NAME = 'module_timer';
	/** Версия модуля */
	var MODULE_VERSION = '1.0.0';
	/** Автор модуля */
	var MODULE_AUTHOR = 'Петухов Леонид';
	/** Дата релиза модуля */
	var MODULE_DATE = '2023-04-20';
	/** Описание модуля */
	var MODULE_DESCRIPTION = 'Таймер.';
	/** Объект */
	var object_module = {};


	/**
	 * Формирует текст для вывода
	 * @param $time
	 * @returns {string}
	 */
	function getTextTimer($timer) {
		// Минуты
		var $time = Math.floor($timer/60);
		var $min = $time.toString();
		if ($min.length==1) $min = '0' + $min;
		// Секунды
		$time = $timer%60;
		var $sec = $time.toString();
		if ($sec.length==1) $sec = '0' + $sec;

		return $min + ':' + $sec;
	}


	/**
	 * Осуществляет обратный отсчёт
	 * @param $timerObj Объект таймера
	 */
	function countDown($timerObj) {
		// Считываем контрольную точку
		var $start = window.localStorage.getItem($timerObj.timerKey());
		// Получаем текущее время
		var $now = new Date().getTime();
		// Определяем прошедшее время
		var $delta = ($now - $start) / 1000;
		// Определяем оставшееся время до завершения отсчёта
		var $timer = Math.round ($timerObj.duration - $delta);
		// Выводим оставшееся время
		$($timerObj.selector).text(getTextTimer($timer));
		// Если таймер подошёл к концу
		if ($timer <= 0) {
			// Выполняем финальное действие
			$timerObj.finalFunction();
			// Завершаем обратный отсчёт
			setTimeout(function(){},1000);
		} else {
			// Продолжаем отсчёт
			setTimeout(countDown,1000, $timerObj);
		}
	}


	/**
	 * Устанавливает контрольное время таймера (точка отсчёта)
	 * @param $timerObj Объект таймера
	 */
	function setControlPoint($timerObj) {
		// Получаем текущую точку времени
		var $str = new Date().getTime();
		// Запоминаем контрольную точку
		window.localStorage.setItem($timerObj.timerKey(), $str);
	}


	/**
	 * Активирует таймер
	 * @param $selector Селектор, для вывода обратного отсчёта
	 * @param $duration Период обратного отсчёта в секундах
	 * @param $finalFunction Функция, выполняемая в конце отсчёта
	 * @returns $timerObj Объект таймера
	 */
	object_module.new = function ($selector, $duration, $finalFunction) {
		var $timerObj = {
			selector: $selector,
			duration: $duration
		};
		// Финальное действие
		if ($finalFunction === undefined) {
			$timerObj.finalFunction = () => {
				alert($timerObj.selector + ': Отсчёт завершен.');
			};
		} else {
			$timerObj.finalFunction = $finalFunction;
		}
		// Функция сброса счётчика
		$timerObj.resetCountdown = () => {
			setControlPoint($timerObj);
		};
		// Селектор таймера
		$timerObj.timerKey = () => {
			return 'module_timer|' + $timerObj.selector;
		};
		// Выставляем точку отсчёта
		setControlPoint($timerObj);
		// Включаем обратный отсчёт
		setTimeout(countDown,1000, $timerObj);
		return $timerObj;
	}


	/** Возвращает объект с информацией о модуле */
	object_module.info = function() {
		return {
			module: MODULE_NAME,
			version: MODULE_VERSION,
			date: MODULE_DATE,
			author: MODULE_AUTHOR,
			description: MODULE_DESCRIPTION
		};
	};


	/** Выводит сообщение с информацией о модуле */
	object_module.about = function() {
		alert(MODULE_NAME + '\nВерсия: ' + MODULE_VERSION + '\nДата: ' + MODULE_DATE + '\nРазработчик: ' + MODULE_AUTHOR + '\n\n' + MODULE_DESCRIPTION);
	};


	window[MODULE_NAME] = object_module;

	/**/
}(jQuery));
