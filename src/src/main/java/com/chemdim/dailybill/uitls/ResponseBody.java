package com.chemdim.dailybill.uitls;

import lombok.Data;

@Data
public class ResponseBody<T> {
    /**
     * 响应状态码
     */
    private Integer status;
    /**
     * 响应状态码描述
     */
    private String message;
    /**
     * 响应数据
     */
    private T data;
    /**
     * @breif constructor
     * @param status
     * @param message
     * @param data
     */
    public ResponseBody(Integer status, String message, T data) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}
