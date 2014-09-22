<table>
    <tr>
        <th><?php echo $this->Paginator->sort('username', 'Username'); ?></th>
        <th><?php echo $this->Paginator->sort('gender', 'Gender'); ?></th>
    </tr>
       <?php foreach ($users as $u): ?>
    <tr>
        <td><?php echo h($u['User']['username']); ?> </td>
        <td><?php echo h($u['User']['gender']); ?> </td>
    </tr>
    <?php endforeach; ?>
</table>