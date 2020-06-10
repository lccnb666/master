package com.yeqifu.fileUpload.vo;

import com.yeqifu.fileUpload.entity.FileUpload;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @Author: 爱吃西红柿
 * @Date:
 */
@Data
@EqualsAndHashCode(callSuper = false)
public class FileUploadVo extends com.yeqifu.fileUpload.entity.FileUpload {

    private Integer page=1;
    private Integer limit=10;

}
