REM HELLO 2014-07-02 19:06:54 +0200
    
REM           rafal@pkey.pl
    
REM           google.com
    
"c:\Program Files (x86)\PuTTY\"plink.exe -load openshift-vasabi  -L 3306:localhost:3306 "mysqldump --port=3306 -h $OPENSHIFT_MYSQL_DB_HOST -u$OPENSHIFT_MYSQL_DB_USERNAME -p$OPENSHIFT_MYSQL_DB_PASSWORD $OPENSHIFT_APP_NAME" > c:\dev\cc\Modules\Repos\Openshift5\dep\db\production-mysql-20140702190654.sql