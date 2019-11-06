# Modal плагин для CakePHP

Показывает часть страницы (часть html вёрстки) в виде модального окна.

## Инсталяция

Вы можете установить этот плагин в свое приложение CakePHP с помощью [composer](https://getcomposer.org).

Установка плагина:

```
$ sudo composer require valeriy-brunov/modal
$ sudo composer dumpautoload
```

#### Инициализация

В основном шаблоне страницы (такие шаблоны располагаются в .../scr/Template/Layout/...) сразу после тега 'body' необходимо указать место, куда будет вставляться html код для отображения в виде модального окна:

```php
<?php
/**
 * Отображение модальных окон.
 */
?>
<?= $this->fetch('modal') ?>
```

Далее в шаблоне страницы верстку html кода, которая будет показана ввиде модального окна, необходимо заключить между:

```php
<?php
/**
 * Блок представления 'NameBlock'.
 */
?>
<?php $this->start('NameBlock') ?>
// *******
// Здесь должна располагаться верстка html кода, которая может быть показана ввиде модального окна.
// *******
<?php
/**
 * Конец блока.
 */
?>
<?php $this->end() ?>

<?php
/**
 * Модальное окно с листингом альбомов.
 */
?>
<?= $this->element('modal', [
	'id_modal' => 'id_модального_окна',
	'content_modal' => $this->fetch('NameBlock'),
]) ?>

<?php
/**
 * Отображение модальных окон.
 */
?>
<?= $this->fetch('modal') ?>
```

**NameBlock** - имя блока должно быть индивидуально для каждого модального окна. Чуть ниже, после окончания формирования блока модального окна, необходимо вставить элемент модального окна, с указанием 'content_modal' => $this->fetch('NameBlock'). Ещё ниже, необходимо вставить отображение модальных окон (для нескольких окон указывается один раз).

Полный перечень настроек элемента ( $this->element('modal', []) ) модального окна:

```php
@param {string} id_modal
	id модального окна.
@param {string} title_modal
	Заголовок модального окна.
@param {string} content_modal
	Cодержимое модального окна.
@param {string} footer_modal
 	Низ модального окна.
@param {string} add_class_modal_content
    Дополнительный класс к оболочке "modal-content".
```

В JavaScript коде для конкретной страницы инициализировать модальное окно:

```js
$( 'id_модального_окна' ).modal();
```

Произвести необходимые действия с модальным окном:

Открыть модальное окно

```js
$('id_модального_окна').modal('open');
```
Закрыть модальное окно

```js
$('id_модального_окна').modal('close');
```
То есть, для формирования модального окна необходимо: обернуть код верстки html, который необходимо в последствии показать в виде модального окна, в блок представления; сформировать элемент модального окна; отобразить (отправить в основной шаблон) модальное окно, в js коде для конкретной страницы инициализировать модальное окна; в коде html произвести необходимые действия с модальным окном (открыть, закрыть).



