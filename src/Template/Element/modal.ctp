<?php
/**
 * Элемент "Модальное окно".
 *
 * В шаблоне "ctp":
 *      <?= $this->Html->script('widget/modal', ['block' => true]) ?>
 *		<?= $this->Html->css('modal', ['block' => true]) ?>
 *		<?= $this->element('modal',[опции]) ?>
 *
 * В JavaScript коде для конкретной страницы:
 *      $( 'id html кода модального окна' ).modal({опции});
 *
 * Рекомендации по использованию:
 *	Html код, который необходимо разместить внутри модального окна, необходимо поместить между
 * 	<?php $this->start('browserphotos') ?> и <?php $this->end() ?>
 * 
 * @param string id_modal
 *		id модального окна.
 * @param string title_modal
 *		Заголовок модального окна.
 * @param string content_modal
 *		Cодержимое модального окна.
 * @param string footer_modal
 *		Низ модального окна.
 * @param string add_class_modal_content
 *		Дополнительный класс к оболочке "modal-content".
 */
?>

<?php
/**
 * Начало блока.
 */
?>
<?php $this->append('modal') ?>

<?php
/**
 * Модальное окно.
 */
?>
<div id="<?= $id_modal ?>" class="modal">
	<div class="modal-list">
		<div class="modal-setting">

			<?php
			/**
			 * Header
			 */
			?>
			<?php if (isset($title_modal)): ?>
				<div class="modal-header">
					<h3><?= $title_modal ?></h3>
					<a href="#" onclick="jQuery('#<?= $id_modal ?>').modal('close'); return false;"><h2>x</h2></a>
				</div>
			<?php endif; ?>

			<?php
			/**
			 * Content
			 */
			?>
			<div class="modal-content<?php if (isset($add_class_modal_content)) echo ' ' . $add_class_modal_content; ?>">
				<?= $content_modal ?>
			</div>

			<?php
			/**
			 * Footer
			 */
			?>
			<?php if (isset($footer_modal)): ?>
				<div class="modal-footer">
					<?= $footer_modal ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</div>

<?php
/**
 * Конец блока.
 */
?>
<?php $this->end() ?>

<?php
/**
 * CSS и JS.
 */
?>
<?= $this->Html->script('Modal.modal', ['block' => true]) ?>
<?= $this->Html->css('Modal.modal', ['block' => true]) ?>