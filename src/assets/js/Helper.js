/**
 * Helper类存放和业务有关的公共方法；Utils类存放和业务无关的公共方法；
 */
window.Helper = {
    /**
     * 格式“是”or“否”
     */
    formatYesOrNo: function (value) {
        return (value === 1 || value === '1') ? '是' : ((value === 0 || value === '0') ? '否' : null);
    },
    /**
     * 打开loading模态窗口
     * */
    showLoading: function () {
        if (window.LoadingIsShow) {
            return;
        }
        window.LoadingIsShow = true;
        let html = ['<div class="js-loading" style="position:absolute;left:0;right:0;width:100%;height:100%;z-index:10000;display:flex;justify-content:center;align-items:center;background:rgba(204, 204, 204, 0.2);">'];
        html.push('<i class="fa fa-spinner fa-pulse fa-lg" style=" font-size:28px"></i>');
        html.push('</div>');
        $('body').prepend(html.join(''));
    },
    /**
     * 关闭loading模态窗口
     * */
    hideLoading: function () {
        if (!window.LoadingIsShow) {
            return;
        }
        setTimeout(function () {
            window.LoadingIsShow = false;
            $('.js-loading').remove();
        }, 0)
    },
    /**
     *  消息提示框，自动关闭，一般用于成功操作消息提示
     */
    showToast: function (message, timeout) {
        if (swal) {
            swal({
                position: 'bottom-end',
                type: 'success',
                title: message || '操作成功',
                showConfirmButton: false,
                backdrop: false,
                width: '420px',
                timer: timeout || 3000
            })
        } else {
            let html = ['<div class="js-message-warp" style="position:absolute;right:0;bottom:0;height:150px;width:300px;overflow:hidden;">'];
            html.push('<div class="js-message" style="position:absolute;right:-100%;bottom:-100%;height:100%;width:100%;border:1px solid #ccc;background:rgb(250, 250, 250);font-size:24px;padding:16px;">');
            html.push(message || '操作成功');
            html.push('</div>');
            html.push('</div>');
            $('body').append(html.join(''));
            let $message = $('.js-message'), $warp = $('.js-message-warp');
            $message.animate({right: 0, bottom: 0}, 2000, function () {
                setTimeout(() => {
                    $message.animate({right: '-100%', bottom: '-100%'}, 1500, function () {
                        $warp.remove();
                    });
                }, timeout || 2000);
            });
        }
    },
    /**
     * easyui datagrid 执行查询过滤公共函数
     * @param $dg
     * @param field
     * @param value
     * @param op
     */
    doFilter: function ($dg, field, value, op) {
        if (!value) {
            $dg.datagrid('removeFilterRule', field);
        } else {
            $dg.datagrid('addFilterRule', {
                field: field,
                op: op || 'equal',
                value: value
            });
        }
        $dg.datagrid('unselectAll').datagrid('doFilter');
    },
    backTop: function backTop(minHeight = 300) {
        let backTopHtml = '<button type="button" id="backTopBtn" class="btn btn-outline-secondary" style="position:fixed;bottom:15px;right:15px;display: none;"><span class="fa fa-arrow-up"></span></button>';
        $('body').append(backTopHtml);
        $('#backTopBtn').click(function () {
            $('html, body').animate({scrollTop: 0}, 700)
        }).hover(
            function () {
                $(this).addClass('hover')
            },
            function () {
                $(this).removeClass('hover')
            }
        );
        $(window).scroll(function () {
            let s = $(window).scrollTop();
            if (s > minHeight) {
                $('#backTopBtn').fadeIn(100)
            } else {
                $('#backTopBtn').fadeOut(100)
            }
        })
    }
};


