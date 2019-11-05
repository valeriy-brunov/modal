(function( $ ) {
    $( document ).ready(function() {

    	/**
    	 * Модальные окна.
         *
         * В шаблоне "ctp":
         *      <?= $this->Html->script('widget/modal', ['block' => true]) ?>
         *		<?= $this->Html->css('modal', ['block' => true]) ?>
         *      <?= $this->element('modal',[опции]) ?>
         *
         * В JavaScript коде для конкретной страницы:
         *      $( 'id html кода модального окна' ).modal({опции});
    	 *
    	 * Действия с модальным окном:
    	 * 		Открыть модальное окно: $('id html кода модального окна').modal('open');
    	 * 		Закрыть модальное окно: $('id html кода модального окна').modal('close');
    	 *
    	 * @param object this.element
    	 *		Часть html кода, который необходимо превратить в модальное окно.
    	 * @param int fade
    	 *		Плавность появления и исчезновения модального окна.
    	 */
    	$.widget( "page.modal", {
 
    		/**
    		 * Список значений и настроек по умолчанию.
    		 */
    		options: {
    			fade: null,
    		},
 
    		/**
    		 * Конструктор плагина.
    		 */
    		_create: function() {
    			// Объект body.
                this.body_ = $( 'html body' );
                // Объект оболочки.
            	this.wrap = this.element.children();
                // Следующие два события происходят одновременно, если курсор находится в пределах
                // модального окна, но событие 2 происходит перед событием 1.
                var e = 0;
                // Событие 2: клик в районе модального окна.
                this.wrap.on( 'click', function( event ) {
                    e = 2;
                });
                // Событие 1: клик за пределами модального окна.
                this.element.on( 'click', { mythis: this }, function( event ) {
                    if ( e == 1 || e == 0 ) event.data.mythis.close();
                    else e = 1;
                });
                // Cобытие: размеры окна браузера изменены.
                $( window ).on( 'resize', { mythis: this }, function( event ) {
                    event.data.mythis._resize();
                });
    		},
		
    		/**
    		 * Метод проверяет открыто ли модальное окно.
    		 *
    		 * @return bool true|false
    		 *		true - модальное окно открыто, false - модальное окно закрыто.
    		 */
    		_modalGet: function() {
                if ( window.modal ) return true;
                else return false;
            },
	
            /**
             * Устанавливает глобальные значения для модального окна, чтобы можно было узнать открыто или закрыто модальное окно.
             *
             * @param bool modal true|false
             *		Oткрыто или закрыто модальное окно.
             */
            _modalSet: function( modal ) {
                window.modalObj = this.element;
                window.modal = modal;
                $( window ).trigger( 'modal', [modal] );
            },
 
    		/**
    		 * Основные свойства всплывающего окна.
    		 */
    		_propertiesAll: function() {
                // Высота окна браузера.
                this.winH = document.documentElement.clientHeight;
                // Высота всего документа с учетом прокрутки (для всех браузеров), включая его невидимую часть (если такая область имеется).
                this.bodyH = Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                );
                // Высота невидимой верхней части страницы (для всех браузеров).
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            },

            /**
             * Открывает модальное окно.
             */
            open: function() {
            	// Получаем свойства окна браузера.
                this._propertiesAll();
            	// Если модальное окно открыто.
                if ( this._modalGet() ) {
                	// Закрываем только модальное окно, оставляем затемняющий слой.
                	this._openCloseModal();
                }
                else {
                	// ... иначе, устанавливаем затемняющий слой.
                	this.body_.addClass( 'modalBody' ).prepend( '<div id="overlay" style="position:absolute;width:100%;overflow:hidden;z-index:2000;height:' + this.bodyH + 'px;"></div>' );
                }
                // Определяем, нужно ли показывать модальное окно плавно.
                if ( this.options.fade ) this.element.fadeIn( this.options.fade );
                else this.element.fadeIn(0);
                // В зависимости от размера окна.
                this._resize();
                // Указываем, что модальное окно успешно открыто.
                this._modalSet( true );
            },

            /**
             * Если модальное окно открыто, но подана команда открыть другое модальное окно.
             */
            _openCloseModal: function() {
                window.modalObj.hide();
            },

            /**
             * Закрывает модальное окно.
             */
            close: function() {
            	// Если модальное окно открыто.
                if ( this._modalGet() ) {
                    // Получаем свойства окна браузера.
                    this._propertiesAll();
                    this.body_.removeClass( 'modalBody' );
                    $( '#overlay' ).remove();
                    this._openCloseModal();
                    // Модальное окно успешно закрыто.
                    this._modalSet( false );
                }
            },

            /**
             * Подставляет необходимый стиль, в зависимости от размера окна.
             */
            _resize: function() {
                // Получаем свойства окна браузера.
                this._propertiesAll();
                // После появления модального окна можно определить его высоту.
                var modalH = this.element.children().height();
                // Если модальное окно по высоте ниже окна браузера.
                if ( modalH < this.winH ) {
                    if ( !this.wrap.hasClass( 'modal-center' ) ) this.wrap.addClass( 'modal-center' );
                }
                else {
                    if ( this.wrap.hasClass( 'modal-center' ) ) this.wrap.removeClass( 'modal-center' );
                }
            },

    	});

	});
})( jQuery );
