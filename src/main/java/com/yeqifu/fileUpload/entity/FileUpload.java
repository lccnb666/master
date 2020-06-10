package com.yeqifu.fileUpload.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * InnoDB free: 9216 kB; (`providerid`) REFER `warehouse/bus_provider`(`id`)
 * </p>
 *
 * @author
 * @since
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("sys_handler_process")
@ToString
//@Validated//开启数据校验
public class FileUpload implements Serializable {

    //@Email(message = "可以自定义报错信息") 写上这个标记就必须是“邮件格式”
    //其它格式可以直接百度“JSR303”校验
    private static final long serialVersionUID=1L;

    @TableId(value = "id", type = IdType.ID_WORKER_STR)
    private String id;

    private String create_user;

    private String new_name;

    private String orignal_name;

    private String path;

    private String record_code;

    private Date type;

    private String file_id;

    private Date create_time;
}